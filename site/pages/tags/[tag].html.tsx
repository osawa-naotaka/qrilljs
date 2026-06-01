import type { RootNodeFn, Store } from "qrilljs/core";
import { element, registerRootPage, S_MEDIUM, style, W_MEDIUM } from "qrilljs/core";
import { getAllMarkdowns } from "qrilljs/server";
import * as v from "valibot";
import { page } from "../../components/pages/page.tsx";
import { summaries } from "../../components/sections/summaries.tsx";
import { navitem, postFmSchema, posts_dir, site, tag_map, tagSlugSchema } from "../../site.config.ts";

type RootParameter = {
    tag: string;
};

export function rootPageFnParameters(): RootParameter[] {
    return Object.keys(tag_map).map((tag) => ({ tag }));
}

export default function Root(store: Store): RootNodeFn<RootParameter> {
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

    return async ({ tag }) => {
        const parsed = v.parse(tagSlugSchema, tag);
        const md = (await getAllMarkdowns(posts_dir, postFmSchema)).filter((x) => x.data.tag?.includes(parsed));

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
