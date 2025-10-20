import { readFile } from "node:fs/promises";
import path from "node:path";
import { cwd } from "node:process";
import matter from "gray-matter";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import type { ToC } from "remark-export-toc";
import remarkExportToc from "remark-export-toc";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import * as v from "valibot";
import type { Markdown } from "../../lib/core/markdown.ts";
import { globExt } from "../../server.ts";

export type HtmlToc = {
    html: string;
    toc: ToC[];
};

export async function markdownToHtml(markdown: string): Promise<HtmlToc> {
    const processed = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkFrontmatter)
        .use(remarkExportToc, { prefix: "heading", startLevel: 2 })
        .use(remarkRehype)
        .use(rehypePrism)
        .use(rehypeStringify)
        .process(markdown);
    return {
        html: processed.value.toString(),
        toc: processed.data.toc as ToC[],
    };
}

export async function getAllMarkdowns<T>(
    dir: string,
    schema: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>,
): Promise<Markdown<T>[]> {
    return Promise.all(
        listFiles(dir, ".md").map(async (slug) => {
            const { data, content } = matter(await readFile(path.join(dir, slug), "utf-8"));
            const data_parsed = v.parse(schema, data);
            return { slug: path.basename(slug, ".md"), data: data_parsed, content };
        }),
    );
}

export async function getMarkdown<T>(
    dir: string,
    slug: string,
    schema: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>,
): Promise<Markdown<T>> {
    const markdown = await readFile(path.join(cwd(), dir, `${slug}.md`), "utf-8");
    const { data, content } = matter(markdown);
    const parsed_data = v.parse(schema, data);
    return { slug, data: parsed_data, content };
}

export function listFiles(dir: string, ext: string): string[] {
    return globExt(path.join(cwd(), dir), ext);
}
