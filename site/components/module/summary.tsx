import { dateTime } from "@site/components/element/dateTime";
import { link } from "@site/components/element/link";
import { tag } from "@site/components/element/tag";
import { articleHeader } from "@site/components/module/articleHeader";
import type { PostFm } from "@site/site.config";
import { TAG_DESIGN } from "@site/styles/design";
import { component, element, registerComponent, style } from "qrilljs/core";
import type { HComponentFn, Markdown, Store, StyleRule } from "qrilljs/core";
import { F_XLARGE, S_XLARGE } from "qrilljs/core";

export type SummaryArgument = Markdown<PostFm>;

export function summary(store: Store): HComponentFn<SummaryArgument> {
    const Summary = element(store, "article", { name: "summary" });
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

    registerComponent(store, Summary, component_styles);

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
