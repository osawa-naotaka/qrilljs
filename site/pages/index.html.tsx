import { page } from "@site/components/pages/page";
import { hero } from "@site/components/sections/hero";
import { summaries } from "@site/components/sections/summaries";
import { navitem, postFmSchema, posts_dir, site } from "@site/site.config";
import type { RootPageFn, Store } from "qrilljs/core";
import { element, registerRootPage, S_MEDIUM, style, W_MEDIUM } from "qrilljs/core";
import { getAllMarkdowns } from "qrilljs/server";

export default function Root(store: Store): RootPageFn<void> {
    const Page = page(store);
    const Hero = hero(store);
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
        const posts_sorted = posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

        return (
            <Page title={site.name} description={site.description} lang={site.lang} name={site.name} navitem={navitem}>
                <Hero />
                <PageMainArea>
                    <Summaries posts={posts_sorted} />
                </PageMainArea>
            </Page>
        );
    };
}
