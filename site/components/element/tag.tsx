import { tag_map } from "@site/site.config";
import { component, element } from "qrill/core";
import type { HComponentFn, Store } from "qrill/core";

export type TagArgument = {
    slug: string;
};

export function tag(store: Store): HComponentFn<TagArgument> {
    const Tag = element(store, "tag", { tag: "a" });

    return component(Tag, ({ slug }) => <Tag href={`/tags/${slug}`}>{tag_map[slug] || slug}</Tag>);
}
