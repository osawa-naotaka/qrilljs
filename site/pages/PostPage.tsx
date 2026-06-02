import path from "node:path";
import type { RootNodeFn, Store } from "qrilljs/core";
import { element, registerRootPage, S_2XLARGE, S_MEDIUM, style, W_MEDIUM } from "qrilljs/core";
import { getMarkdown, listFiles, markdownToHtml } from "qrilljs/server";
import { article } from "../components/module/article.tsx";
import { toc } from "../components/module/toc.tsx";
import { page } from "../components/pages/page.tsx";
import { navitem, postFmSchema, posts_dir, site } from "../site.config.ts";

type PostPageParameter = {
    slug: string;
};

export async function rootPageFnParameters(): Promise<PostPageParameter[]> {
    return listFiles(posts_dir, ".md").map((y) => ({ slug: path.basename(y, ".md") }));
}

export function PostPage(store: Store): RootNodeFn<PostPageParameter> {
    const Page = page(store);
    const PageMainArea = element(store, { tag: "main", name: "page-main-area" });
    const Article = article(store);
    const ToC = toc(store);

    const styles = [
        style(PageMainArea)({
            max_width: W_MEDIUM(store),
            width: "100%",
            padding_inline: S_MEDIUM(store),
            margin_inline: "auto",
            margin_block: ["0", S_2XLARGE(store)],
        }),
    ];

    registerRootPage(store, styles);

    return async ({ slug }) => {
        const md = await getMarkdown(posts_dir, slug, postFmSchema);

        const { html, toc } = await markdownToHtml(md.content);

        return (
            <Page
                title={`${md.data.title || ""} | ${site.name}`}
                description={site.description}
                lang={site.lang}
                name={site.name}
                navitem={navitem}
            >
                <PageMainArea>
                    <ToC toc={toc} />
                    <Article {...md}>
                        <raw>{html}</raw>
                    </Article>
                </PageMainArea>
            </Page>
        );
    };
}
