import { dateTime } from "../element/dateTime.tsx";
import { link } from "../element/link.ts";
import { tag } from "../element/tag.tsx";
import { articleHeader } from "./articleHeader.tsx";
import type { PostFm } from "../../site.config.ts";
import { TAG_DESIGN } from "../../styles/design.ts";
import type { ComponentFn, Markdown, Store, StyleRule } from "qrilljs/core";
import { component, element, F_XLARGE, registerStyle, S_XLARGE, style } from "qrilljs/core";

export type SummaryArgument = Markdown<PostFm>;

export function summary(store: Store): ComponentFn<SummaryArgument> {
    const Summary = element(store, { tag: "article", name: "summary" });
    const ArticleHeader = articleHeader(store);
    const Author = element(store);
    const SummaryTag = tag(store);
    const DateTime = dateTime(store);
    const Link = link(store);

    const component_styles: (StyleRule | StyleRule[])[] = [
        style(Summary)({ margin_block: S_XLARGE(store) }),
        style(Summary, ArticleHeader, "h2")({ font_size: F_XLARGE(store) }),
        TAG_DESIGN(store, "text", SummaryTag),
    ];

    registerStyle(store, Summary, component_styles);

    return component(Summary, ({ slug, data }) => (
        <Summary>
            <ArticleHeader
                title={
                    <Link href={`/posts/${slug}`}>
                        <h2>{data.title}</h2>
                    </Link>
                }
            >
                <Author>{data.author}</Author>
                <DateTime datetime={data.date} />
                {(data.tag || []).map((x) => (
                    <SummaryTag slug={x} key={x} />
                ))}
            </ArticleHeader>
        </Summary>
    ));
}
