import { dateTime } from "@site/components/element/dateTime";
import { shareX } from "@site/components/element/shareX";
import { tag } from "@site/components/element/tag";
import { articleHeader } from "@site/components/module/articleHeader";
import type { PostFm } from "@site/site.config";
import { TAG_DESIGN } from "@site/styles/design";
import {
    F_LARGE,
    F_XLARGE,
    Link,
    S_2XLARGE,
    S_MEDIUM,
    TEXT_JUSTIFY,
    TEXT_UNDERLINE,
    colorof,
} from "qrill/core";
import { A, H2, H3, H4, H5, Li, Ol, P, Script, Ul } from "qrill/core";
import { as, component, element, registerComponent, style } from "qrill/core";
import type { HComponentFn, Markdown, Store } from "qrill/core";

export type ArticleArgument = Markdown<PostFm>;

export function article(store: Store): HComponentFn<ArticleArgument> {
    const Article = element("article", { tag: "article" });
    const ArticleHeader = articleHeader(store);
    const Author = element("author");
    const ArticleTag = as("article-tag", tag());
    const DateTime = dateTime();
    const ArticleText = element("article-text");
    const ShareX = shareX(store);

    const component_styles = [
        style(Article)({ margin_block: S_2XLARGE(store) }),

        style(ArticleHeader, H2)({ font_size: F_XLARGE(store) }),
        TAG_DESIGN(store, "text", ArticleTag),

        style(ArticleText)(
            TEXT_JUSTIFY,
            {
                display: "flex",
                flex_direction: "column",
                align_items: "normal",
                gap: "0"
            },
        ),
        style(ArticleText, H3)(
            {
                font_size: F_LARGE(store),
                border_radius: "4px",
                padding_inline: S_MEDIUM(store),
                padding_block: "3px",
                margin_block: [S_2XLARGE(store), S_MEDIUM(store)],
                color: colorof(store, "text_secondary"),
                background_color: colorof(store, "background_secondary", "light"),
            },
        ),
        style(ArticleText, P)( 
            {
                margin_block: ["0", S_2XLARGE(store)],
                text_indent: S_MEDIUM(store),
            }
        ),
        style(ArticleText, H4)(
            {
                border_bottom: "1px solid",
                margin_block: S_MEDIUM(store),
            }
        ),
        style(ArticleText, H5)(
            {
                border_left: "4px solid"
            }
        ),
        style(ArticleText, Ul)(
            {
                list_style_type: "disc"
            }
        ),
        style(ArticleText, Ol)({ list_style_type: "decimal" }),
        style(ArticleText, A)(TEXT_UNDERLINE),
        style(ArticleText, Li)({ margin_inline: S_2XLARGE(store) }),
    ];

    const prism_cdn = "https://cdn.jsdelivr.net/npm/prismjs@1.30.0";
    const prism_theme: string = "tomorrow";
    const css_filename = `prism${prism_theme === "" ? "" : `-${prism_theme}`}.min.css`;
    registerComponent(store, Article, component_styles, {
        inserts: [
            {
                selector: ["head"],
                nodes: [
                    Link({ href: `${prism_cdn}/themes/${css_filename}`, rel: "stylesheet" }),
                    Script({ src: `${prism_cdn}/components/prism-core.min.js` }),
                    Script({ src: `${prism_cdn}/plugins/autoloader/prism-autoloader.min.js` }),
                ],
            },
        ],
    });

    return component(Article, ({ data, slug }, ...child) => (
        <Article>
            <ArticleHeader title={<h2>{data.title}</h2>}>
                <Author>{data.author}</Author>
                <DateTime datetime={data.date} />
                {(data.tag || []).map((x) => (
                    <ArticleTag slug={x} key={x} />
                ))}
                <ShareX title={data.title} url={`http://localhost/posts/${slug}`} />
            </ArticleHeader>
            <ArticleText>{child}</ArticleText>
        </Article>
    ));
}
