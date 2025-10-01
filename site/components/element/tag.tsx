import { tag_map } from "@site/site.config";
import { component, element } from "qrilljs/core";
import type { HComponentFn, Store } from "qrilljs/core";

export type TagArgument = {
    slug: string;
};

export function tag(store: Store): HComponentFn<TagArgument> {
    const Tag = element(store, { tag: "a" }, "tag");

    return component(Tag, ({ slug }) => <Tag href={`/tags/${slug}`}>{tag_map[slug] || slug}</Tag>);
}
