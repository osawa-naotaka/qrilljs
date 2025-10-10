import path from "node:path";
import { article } from "@site/components/module/article";
import { toc } from "@site/components/module/toc";
import { page } from "@site/components/pages/page";
import { navitem, postFmSchema, posts_dir, site } from "@site/site.config";
import { S_MEDIUM, W_MEDIUM, element, registerRootPage, style } from "qrilljs/core";
import type { HRootPageFn, Store } from "qrilljs/core";
import { S_2XLARGE } from "qrilljs/core";
import { getMarkdown, listFiles, markdownToHtml } from "qrilljs/server";

type RootParameter = {
    slug: string;
};

export async function rootPageFnParameters(): Promise<RootParameter[]> {
    return listFiles(posts_dir, ".md").map((y) => ({ slug: path.basename(y, ".md") }));
}

export default function Root(store: Store): HRootPageFn<RootParameter> {
    const Page = page(store);
    const PageMainArea = element(store, "main", { name: "page-main-area" });
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
