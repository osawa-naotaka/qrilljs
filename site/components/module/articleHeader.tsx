import { component, element, registerStyle, style } from "qrilljs/core";
import type { HComponentFn, HNode, Store } from "qrilljs/core";
import { F_SMALL, S_SMALL, S_TINY } from "qrilljs/core";

export type ArticleHeaderArgument = {
    title: HNode;
};

export function articleHeader(store: Store): HComponentFn<ArticleHeaderArgument> {
    const ArticleHeader = element(store, "header", { name: "article-header" });
    const Title = element(store);
    const Meta = element(store);

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

    registerStyle(store, ArticleHeader, component_styles);

    return component(ArticleHeader, ({ title }, ...children) => (
        <ArticleHeader>
            <Title>{title}</Title>
            <Meta>{children}</Meta>
        </ArticleHeader>
    ));
}
