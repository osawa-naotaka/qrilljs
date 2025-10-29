import { readFile } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import http from "node:http";
import { createRequire } from "node:module";
import path from "node:path";
import { cwd } from "node:process";
import type { Duplex } from "node:stream";
import type { FSWatcher } from "chokidar";
import chokidar from "chokidar";
import { WebSocketServer } from "ws";
import type { QrillConfig } from "../cli/config.ts";
import { default_config, loadConfig, requireConfig } from "../cli/config.ts";
import { bundleCss } from "../cli/css.ts";
import { bundleWoff2 } from "../cli/font.ts";
import { bundleHtml, stringifyToHtml } from "../cli/html.ts";
import type { Router } from "../cli/route.ts";
import { createAssetRouter, createPageRouter, createStaticRouter, withoutExt } from "../cli/route.ts";
import { bundleScriptEsbuild } from "../cli/script.ts";
import { simpleElement } from "../lib/core/component.ts";
import { default_design_rule } from "../lib/core/design.ts";
import type { Store } from "../lib/core/store.ts";
import { generateStore } from "../lib/core/store.ts";
import { contentType } from "../lib/core/util.ts";
import { ErrorPage, InternalServerErrorPage } from "../page/error.tsx";
import { qrill_error_css } from "../page/qrill-error.ts";
import { importPage } from "./page.ts";

export async function serve(conf_file: string | undefined): Promise<void> {
    const config = loadConfig(conf_file ?? "qrill.config.ts", default_config);
    const watch_dir = path.join(cwd(), config.server.watch_dir);
    const watcher = chokidar.watch(watch_dir, { persistent: true });

    const [proc, reload] = createReqProcessor(config);

    if (typeof process !== "undefined" && process.versions && Object.hasOwn(process.versions, "bun")) {
        createAndStartBunServer(config, proc, reload, watcher);
    } else if (typeof globalThis !== "undefined" && globalThis.Deno) {
        createAndStartDenoServer(config, proc, reload, watcher);
    } else {
        createAndStartNodeServer(config, proc, reload, watcher);
    }
}

type Resp = {
    status: number;
    type: string;
    content: ArrayBuffer;
};

type ReqProcessFn = (req: Request) => Promise<Resp>;
type ReloadFn = () => void;

function createAndStartDenoServer(config: QrillConfig, proc: ReqProcessFn, reload: ReloadFn, watcher: FSWatcher): void {
    Deno.serve({ port: config.server.port, hostname: config.server.hostname }, async (req: Request) => {
        if (req.headers.get("upgrade") === "websocket") {
            const { socket, response } = Deno.upgradeWebSocket(req);
            socket.addEventListener("open", () => {
                watcher.removeAllListeners();
                watcher.on("all", () => {
                    reload();
                    socket.send("reload");
                });
            });
            socket.addEventListener("close", () => {
                watcher.removeAllListeners();
            });
            return response;
        }

        const rv = await proc(req);
        return new Response(rv.content, { status: rv.status, headers: { "Content-Type": rv.type } });
    });
}

function createAndStartBunServer(config: QrillConfig, proc: ReqProcessFn, reload: ReloadFn, watcher: FSWatcher): void {
    const server = Bun.serve({
        websocket: {
            open(ws) {
                watcher.removeAllListeners();
                watcher.on("all", () => {
                    reload();
                    ws.send("reload");
                });
            },
            message(_ws, message) {
                console.log("Received:", message);
            },
            close() {
                watcher.removeAllListeners();
            },
        },
        async fetch(req: Request): Promise<Response> {
            if (server.upgrade(req)) {
                return new Response(null, { status: 101 });
            }
            const rv = await proc(req);
            return new Response(rv.content, { status: rv.status, headers: { "Content-Type": rv.type } });
        },
        port: config.server.port,
        hostname: config.server.hostname,
        async error(error) {
            console.error(error);
            return new Response(error.message, { status: 500, headers: { "Content-Type": "text/plain" } });
        },
    });
}

function createAndStartNodeServer(config: QrillConfig, proc: ReqProcessFn, reload: ReloadFn, watcher: FSWatcher): void {
    const http_server = http.createServer(async (msg: IncomingMessage, resp: ServerResponse) => {
        const req: Request = new Request(new URL(`http://${msg.headers.host}${msg.url}`));
        const rv = await proc(req);
        resp.writeHead(rv.status, { "Content-Type": rv.type });
        resp.end(Buffer.from(rv.content));
    });

    const wss = new WebSocketServer({ noServer: true });

    wss.on("connection", function connection(ws) {
        ws.on("error", console.error);

        ws.on("close", () => {
            watcher.removeAllListeners();
        });
    });

    http_server.on("upgrade", (req: IncomingMessage, socket: Duplex, head: Buffer<ArrayBufferLike>) => {
        const { pathname } = new URL(req.url || "", `wss://${config.server.hostname}`);
        if (pathname === "/reload") {
            wss.handleUpgrade(req, socket, head, (ws) => {
                watcher.on("all", () => {
                    watcher.removeAllListeners();
                    reload();
                    ws.send("reload");
                });
                wss.emit("connection", ws, req);
            });
        } else {
            socket.destroy();
        }
    });

    http_server.listen(config.server.port, config.server.hostname);
}

function createAssetRouterSet(store: Store, target_prefix: string, require: NodeJS.Require): [string, Router][] {
    const asset_files: [string, Router][] = [];
    for (const [key, value] of store.components.entries()) {
        if (value.attachment?.assets !== undefined) {
            asset_files.push([key, createAssetRouter(target_prefix, value.attachment.assets, require)]);
        }
    }

    return asset_files;
}

function toArrayBuffer(content_arg: string | Buffer<ArrayBufferLike>): ArrayBuffer {
    if (typeof content_arg === "string") {
        return new TextEncoder().encode(content_arg).buffer;
    }

    return new Uint8Array(content_arg).buffer.slice(
        content_arg.byteOffset,
        content_arg.byteOffset + content_arg.byteLength,
    );
}

function normalResponse(content_arg: string | Buffer<ArrayBufferLike>, ext: string): Resp {
    const content = toArrayBuffer(content_arg);
    return { status: 200, content, type: contentType(ext) };
}

function errorResponse(status: number, cause: string | Error): Resp {
    const store = generateStore({ target_prefix: "" });

    if (typeof cause === "string") {
        const content = toArrayBuffer(stringifyToHtml(0, [])(ErrorPage(store, { name: status.toString(), cause })));
        return { status, content, type: "text/html" };
    }

    const content = toArrayBuffer(stringifyToHtml(0, [])(InternalServerErrorPage(store, cause)));
    return { status, content, type: "text/html" };
}

function createReqProcessor(config: QrillConfig): [ReqProcessFn, ReloadFn] {
    const require = createRequire(import.meta.url);

    const root = cwd();
    const page_dir = path.join(root, config.input.page_dir);
    const public_dir = path.join(root, config.input.public_dir);

    let site_config = requireConfig(require, config.input.site_conf, default_design_rule);

    let page_router = createPageRouter(page_dir);
    let public_router = createStaticRouter(public_dir);
    let asset_router = new Map<string, Router>();

    const reload_fn: ReloadFn = () => {
        for (const key of Object.keys(require.cache)) {
            delete require.cache[key];
        }
        page_router = createPageRouter(page_dir);
        public_router = createStaticRouter(public_dir);
        asset_router = new Map<string, Router>();
        site_config = requireConfig(require, config.input.site_conf, default_design_rule);
    };

    const proc_fn: ReqProcessFn = async (req: Request) => {
        try {
            // Page router
            const match_page = page_router(req);
            if (!(match_page instanceof Error)) {
                const page = await importPage(
                    require,
                    path.join(page_dir, match_page.target_file),
                    config,
                    site_config,
                );

                if (page !== null) {
                    // auto generation of .css , .js and .woff2 from .html.ts
                    if (match_page.auto_generate) {
                        if (page.root_page_fn === undefined) {
                            throw new Error("server internal error.");
                        }
                        switch (match_page.req_ext) {
                            case ".css": {
                                const css_name = withoutExt(withoutExt(match_page.target_file));
                                const css = await bundleCss(page.store, css_name);
                                if (css instanceof Error) {
                                    return errorResponse(500, css);
                                }
                                return normalResponse(css || "", match_page.req_ext);
                            }
                            case ".js": {
                                const js = await bundleScriptEsbuild(page.store, page.client_element_count_start);
                                return normalResponse(js || "", match_page.req_ext);
                            }
                            case ".woff2": {
                                const woff2 = await bundleWoff2(page.store);
                                return normalResponse(woff2 || "", match_page.req_ext);
                            }
                            default:
                                return errorResponse(500, `auto generation of ${match_page.req_ext} is not supported.`);
                        }
                    }

                    switch (match_page.req_ext) {
                        case ".html": {
                            if (page.root_page_fn === undefined) {
                                throw new Error(`file "${match_page.target_file}" does not includes default export.`);
                            }
                            const router_set = createAssetRouterSet(page.store, config.asset.target_prefix, require);
                            for (const [key, router] of router_set) {
                                asset_router.set(key, router);
                            }

                            const script = simpleElement("script");
                            const link = simpleElement("link");
                            const css_name = encodeURI(`${withoutExt(withoutExt(match_page.target_file))}.css`);
                            const js_name = encodeURI(`${withoutExt(withoutExt(match_page.target_file))}.js`);
                            const insert_nodes = [
                                script({ type: "module", src: "/reload.js" }),
                                script({ type: "module", src: js_name }),
                                link({ href: css_name, rel: "stylesheet" }),
                            ];

                            const html_text = await bundleHtml(
                                page.store,
                                match_page.params,
                                page.root_page_fn.default,
                                insert_nodes,
                            );

                            return normalResponse(html_text, ".html");
                        }
                        default:
                            if (page.any_page_fn_result === undefined) {
                                throw new Error(
                                    `processing result of file "${match_page.target_file}" default() is a function. But this file extenstion needs string output.`,
                                );
                            }
                            return normalResponse(page.any_page_fn_result, match_page.req_ext);
                    }
                }
                return errorResponse(
                    500,
                    `${match_page.target_file} or its client scripts does not have default export.`,
                );
            }

            // Public router
            const match_public = public_router(req);
            if (!(match_public instanceof Error)) {
                const content = await readFile(path.join(public_dir, match_public.target_file));
                return normalResponse(content, match_public.req_ext);
            }

            // Asset router
            for (const router of asset_router.values()) {
                const match_asset = router(req);
                if (!(match_asset instanceof Error)) {
                    const content = await readFile(match_asset.target_file);
                    return normalResponse(content, match_asset.req_ext);
                }
            }

            // reload plugin
            if (new URL(req.url).pathname.endsWith("/reload.js")) {
                const reload =
                    // biome-ignore lint/suspicious/noTemplateCurlyInString : this template string placeholder in the "" is intended one.
                    "const ws = new WebSocket(`ws://${location.host}/reload`); ws.onmessage = (event) => { if (event.data === 'reload') { location.reload(); } }; window.addEventListener('beforeunload', () => ws.close());";
                return normalResponse(reload, ".js");
            }

            // css for error page
            if (new URL(req.url).pathname.localeCompare("/qrill-error.css") === 0) {
                return normalResponse(qrill_error_css, ".css");
            }

            return errorResponse(404, `route for url "${req.url}" not found.`);
        } catch (e) {
            if (e instanceof Error) {
                return errorResponse(500, e);
            }
            throw e;
        }
    };

    return [proc_fn, reload_fn];
}
