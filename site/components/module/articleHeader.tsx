import { component, element, registerComponent, style } from "qrill/core";
import type { HComponentFn, HNode, Store } from "qrill/core";
import { F_SMALL, S_SMALL, S_TINY } from "qrill/core";

export type ArticleHeaderArgument = {
    title: HNode;
};

export function articleHeader(store: Store): HComponentFn<ArticleHeaderArgument> {
    const ArticleHeader = element(store, "article-header", { tag: "header" });
    const Title = element(store, "article-header-title");
    const Meta = element(store, "article-header-meta");

    const component_styles = [
        style(Title)({ border_bottom: "2px solid" }),
        style(Meta)({
            display: "flex",
            flex_direction: "row",
            align_items: "center",
            justify_content: "flex-end",
            gap: S_SMALL(store),
            font_size: F_SMALL(store),
            line_height: "1",
            margin_block: [S_TINY(store), "0"],
        }),
    ];

    registerComponent(store, ArticleHeader, component_styles);

    return component(ArticleHeader, ({ title }, ...child) => (
        <ArticleHeader>
            <Title>{title}</Title>
            <Meta>{child}</Meta>
        </ArticleHeader>
    ));
}
