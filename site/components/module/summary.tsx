import { dateTime } from "@site/components/element/dateTime";
import { hlink } from "@site/components/element/hlink";
import { tag } from "@site/components/element/tag";
import { articleHeader } from "@site/components/module/articleHeader";
import type { PostFm } from "@site/site.config";
import { TAG_DESIGN } from "@site/styles/design";
import { H2, as, component, element, registerComponent, style } from "qrill/core";
import type { HComponentFn, Markdown, Store, StyleRule } from "qrill/core";
import { F_XLARGE, S_XLARGE } from "qrill/core";

export type SummaryArgument = Markdown<PostFm>;

export function summary(store: Store): HComponentFn<SummaryArgument> {
    const Summary = element("summary", { tag: "article" });
    const ArticleHeader = articleHeader(store);
    const Author = element("author");
    const SummaryTag = as("summary-tag", tag());
    const DateTime = dateTime();
    const HLink = hlink(store);

    const component_styles: (StyleRule | StyleRule[])[] = [
        style(Summary)({ margin_block: S_XLARGE(store) }),
        style(Summary, ArticleHeader, H2)({ font_size: F_XLARGE(store) }),
        TAG_DESIGN(store, "text", SummaryTag),
    ];

    registerComponent(store, Summary, component_styles);

    return component(Summary, ({ slug, data }) => (
        <Summary>
            <ArticleHeader
                title={
                    <HLink href={`/posts/${slug}`}>
                        <h2>{data.title}</h2>
                    </HLink>
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
