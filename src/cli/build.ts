import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { cwd } from "node:process";
import { globSync } from "glob";
import { QNode, simpleElement } from "../lib/core/component.ts";
import { default_design_rule } from "../lib/core/design.ts";
import { generateStore, type HComponentAsset, type Store } from "../lib/core/store.ts";
import { replaceExt } from "../lib/core/util.ts";
import { PageRoute } from "../server.ts";
import { default_config, loadConfig } from "./config.ts";
import { bundleCss } from "./css.ts";
import { bundleWoff2 } from "./font.ts";
import { bundleHtml } from "./html.ts";
import { bundleScriptEsbuild } from "./script.ts";

export async function build(conf_file: string | undefined) {
    const start = performance.now();

    const require = createRequire(import.meta.url);

    const config = loadConfig(conf_file ?? "qrill.config.ts", default_config);
    const site_config = loadConfig(config.input.site_conf, default_design_rule);

    const root = cwd();
    const dist_dir = path.join(root, config.output.dist_dir);
    const public_dir = path.join(root, config.input.public_dir);

    const asset_store = new Map<string, HComponentAsset[]>();

    if (config.output.clean_befor_build && existsSync(dist_dir)) {
        rmSync(dist_dir, { recursive: true });
    }

    const import_start = performance.now();
    let route: Record<string, PageRoute<unknown>>[] = require(path.join(root, config.input.route)).default;
    console.log(`import ${config.input.route} in ${(performance.now() - import_start).toFixed(2)}ms`);
    
    for (const record of route) {
        for (const [key, r] of Object.entries(record)) {
            if (r.isGen) {
              const store = generateStore(config.asset, site_config);
              const pageFn = r.pageFn(store);
              switch (r.ext) {
                  case ".html":
                      const page = await pageFn(r.param);
                      await processAndWriteHtml(key, dist_dir, [r.shared_path ?? r.path, r.shared_path ?? r.path], page, store);
                      break;
                  
                  case ".css":
                      const css_start = performance.now();
                  
                      const css = await bundleCss(store, key);
                      if (css instanceof Error) {
                          console.warn(css);
                          break;
                      }

                      writeToFile(css ?? "", key, dist_dir, ".css", css_start);                         
                      break;

                  case ".js":
                      const js_start = performance.now();
                      const js = await bundleScriptEsbuild(store, store.element_count);
                      writeToFile(js ?? "", key, dist_dir, ".js", js_start);
                      break;

                  case ".woff2":
                      const woff2_start = performance.now();
                      const woff2 = await bundleWoff2(store);
                      writeToFile(woff2 ?? "", key, dist_dir, ".woff2", woff2_start);
                      break;

                  case ".json":
                      const json = await pageFn(r.param);
                      await processAnyDotTs(key, dist_dir, json as string);
                      break;
              }
            }
        }
    }

    // copy assets
    for (const statics of asset_store.values()) {
        for (const entry of statics) {
            const root_dir =
                entry.package_name === undefined
                    ? cwd()
                    : path.dirname(require.resolve(`${entry.package_name}/package.json`));
            for (const file of entry.copy_files) {
                copyFiles(root_dir, file.src, path.join(dist_dir, config.asset.target_prefix, file.dist));
            }
        }
    }

    // copy public
    if (existsSync(public_dir)) {
        const start = performance.now();
        copyDir(public_dir, dist_dir);
        console.log(`process public in ${(performance.now() - start).toFixed(2)}ms`);
    }

    console.log(`build in ${(performance.now() - start).toFixed(2)}ms`);
}

function copyFiles(root: string, pattern: string, dist_dir: string) {
    for (const src of globSync(pattern, { cwd: root, nodir: true })) {
        const content = readFileSync(path.join(root, src));
        ensureDirWrite(path.join(dist_dir, path.parse(src).base), content);
    }
}

function copyDir(root: string, dist_dir: string) {
    for (const src of globSync("**/*", { cwd: root, nodir: true })) {
        const content = readFileSync(path.join(root, src));
        ensureDirWrite(path.join(dist_dir, src), content);
    }
}

async function processAnyDotTs(relative_path: string, dist_dir: string, output_string: string): Promise<void> {
    const start = performance.now();
    const absolute_path = path.join(dist_dir, relative_path);
    ensureDirWrite(absolute_path, output_string);
    console.log(`process ${relative_path} in ${(performance.now() - start).toFixed(2)}ms`);
}

async function processAndWriteHtml(
    relative_path: string,
    dist_dir: string,
    [css_link, js_src]: [string, string],
    top_node: QNode,
    store: Store,
): Promise<void> {
    const html_start = performance.now();

    const script = simpleElement("script");
    const link = simpleElement("link");
    const insert_nodes = [
        css_link !== "" ? link({ href: encodeURI(css_link), rel: "stylesheet" }) : "",
        js_src !== "" ? script({ type: "module", src: encodeURI(js_src) }) : "",
    ];

    const html = bundleHtml(store, top_node, insert_nodes);

    writeToFile(html, relative_path, dist_dir, ".html", html_start);
}

function writeToFile(
    content: string | Buffer<ArrayBufferLike>,
    file_name: string,
    dist_dir: string,
    ext: string,
    start: number,
): string {
    const file_ext = replaceExt(file_name, ext);
    const absolute_path = path.join(dist_dir, file_ext);
    ensureDirWrite(absolute_path, content);
    console.log(`process ${file_ext} in ${(performance.now() - start).toFixed(2)}ms`);

    return file_ext;
}

function ensureDirWrite(absolute_path: string, content: string | Buffer<ArrayBufferLike>) {
    const base = path.dirname(absolute_path);
    ensureDir(base);
    writeFileSync(absolute_path, content);
}

function ensureDir(base: string) {
    if (!existsSync(base)) {
        const pdir = base.endsWith("/") ? base.slice(0, -1) : base;
        ensureDir(path.dirname(pdir));
        mkdirSync(base);
    }
}
