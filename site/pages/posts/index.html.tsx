import type { RootPageFn, Store } from "qrilljs/core";
import { element, registerRootPage, S_MEDIUM, style, W_MEDIUM } from "qrilljs/core";
import { getAllMarkdowns } from "qrilljs/server";
import { page } from "../../components/pages/page.tsx";
import { summaries } from "../../components/sections/summaries.tsx";
import { navitem, postFmSchema, posts_dir, site } from "../../site.config.ts";

export default function Root(store: Store): RootPageFn<void> {
    const Page = page(store);
    const PageMainArea = element(store, { tag: "main", name: "page-main-area" });
    const Summaries = summaries(store);

    const styles = [
        style(PageMainArea)({
            max_width: W_MEDIUM(store),
            width: "100%",
            padding_inline: S_MEDIUM(store),
            margin_inline: "auto",
        }),
    ];

    registerRootPage(store, styles);

    return async () => {
        const posts = await getAllMarkdowns(posts_dir, postFmSchema);
        const posts_sorted = posts.sort((a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime());

        return (
            <Page title={site.name} description={site.description} lang={site.lang} name={site.name} navitem={navitem}>
                <PageMainArea>
                    <Summaries posts={posts_sorted} />
                </PageMainArea>
            </Page>
        );
    };
}
