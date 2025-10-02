import { page } from "@site/components/pages/page";
import { summaries } from "@site/components/sections/summaries";
import { navitem, postFmSchema, posts_dir, site, tag_map } from "@site/site.config";
import { element, registerRootPage, style } from "qrilljs/core";
import type { HRootPageFn, Store } from "qrilljs/core";
import { DEFAULT_RESPONSIVE_PAGE_WIDTH } from "qrilljs/core";
import { getAllMarkdowns } from "qrilljs/server";

type RootParameter = {
    tag: string;
};

export function rootPageFnParameters(): RootParameter[] {
    return Object.keys(tag_map).map((tag) => ({ tag }));
}

export default function Root(store: Store): HRootPageFn<RootParameter> {
    const Page = page(store);
    const PageMainArea = element(store, "main", { name: "page-main-area" });
    const Summaries = summaries(store);

    const styles = [style(PageMainArea)(DEFAULT_RESPONSIVE_PAGE_WIDTH(store))];

    registerRootPage(store, styles);

    return async ({ tag }) => {
        const md = (await getAllMarkdowns(posts_dir, postFmSchema)).filter((x) => x.data.tag?.includes(tag));

        return (
            <Page
                title={`${tag || ""} | ${site.name}`}
                description={site.description}
                lang={site.lang}
                name={site.name}
                navitem={navitem}
            >
                <PageMainArea>
                    <Summaries posts={md} />
                </PageMainArea>
            </Page>
        );
    };
}
