import type { ComponentFn, Markdown, Store } from "qrilljs/core";
import {
    colorof,
    component,
    element,
    F_LARGE,
    F_XLARGE,
    registerInsert,
    registerStyle,
    S_2XLARGE,
    S_MEDIUM,
    style,
} from "qrilljs/core";
import type { PostFm } from "../../site.config.ts";
import { TAG_DESIGN } from "../../styles/design.ts";
import { dateTime } from "../element/dateTime.tsx";
import { shareX } from "../element/shareX.tsx";
import { tag } from "../element/tag.tsx";
import { articleHeader } from "./articleHeader.tsx";

export type ArticleArgument = Markdown<PostFm>;

export function article(store: Store): ComponentFn<ArticleArgument> {
    const Article = element(store, { tag: "article", name: "article" });
    const ArticleHeader = articleHeader(store);
    const Author = element(store);
    const ArticleTag = tag(store);
    const DateTime = dateTime(store);
    const ArticleText = element(store);
    const ShareX = shareX(store);

    const component_styles = [
        style(Article)({ margin_block: S_2XLARGE(store) }),

        style(ArticleHeader, "h2")({ font_size: F_XLARGE(store) }),
        TAG_DESIGN(store, "text", ArticleTag),

        style(ArticleText)({
            display: "flex",
            flex_direction: "column",
            align_items: "normal",
            gap: "0",
            overflow_wrap: "anywhere",
            text_align: "justify",
        }),
        style(
            ArticleText,
            "h3",
        )({
            font_size: F_LARGE(store),
            border_radius: "4px",
            padding_inline: S_MEDIUM(store),
            padding_block: "3px",
            margin_block: [S_2XLARGE(store), S_MEDIUM(store)],
            color: colorof(store, "text_secondary"),
            background_color: colorof(store, "background_secondary", "light"),
        }),
        style(
            ArticleText,
            "p",
        )({
            margin_block: ["0", S_2XLARGE(store)],
            text_indent: S_MEDIUM(store),
        }),
        style(
            ArticleText,
            "h4",
        )({
            border_bottom: "1px solid",
            margin_block: S_MEDIUM(store),
        }),
        style(
            ArticleText,
            "h5",
        )({
            border_left: "4px solid",
        }),
        style(
            ArticleText,
            "ul",
        )({
            list_style_type: "disc",
        }),
        style(ArticleText, "ol")({ list_style_type: "decimal" }),
        style(
            ArticleText,
            "a",
        )({
            text_decoration: ["underline", "2px"],
            text_underline_offset: "5px",
        }),
        style(ArticleText, "li")({ margin_inline: S_2XLARGE(store) }),
    ];

    const prism_cdn = "https://cdn.jsdelivr.net/npm/prismjs@1.30.0";
    const prism_theme: string = "tomorrow";
    const css_filename = `prism${prism_theme === "" ? "" : `-${prism_theme}`}.min.css`;
    registerStyle(store, Article, component_styles);
    registerInsert(store, Article, [
        {
            selector: ["head"],
            nodes: [<link key={css_filename} href={`${prism_cdn}/themes/${css_filename}`} rel="stylesheet" />],
        },
    ]);

    return component(Article, ({ data, slug, children }) => (
        <Article>
            <ArticleHeader title={<h2>{data.title}</h2>}>
                <Author>{data.author}</Author>
                <DateTime datetime={data.date} />
                {(data.tag || []).map((x) => (
                    <ArticleTag slug={x} key={x} />
                ))}
                <ShareX title={data.title} url={`http://localhost/posts/${slug}`} />
            </ArticleHeader>
            <ArticleText>{children}</ArticleText>
        </Article>
    ));
}
