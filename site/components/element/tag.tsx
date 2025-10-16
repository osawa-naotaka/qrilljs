import { tag_map } from "@site/site.config";
import type { ComponentFn, Store } from "qrilljs/core";
import { component, element } from "qrilljs/core";

export type TagArgument = {
    slug: string;
};

export function tag(store: Store): ComponentFn<TagArgument> {
    const Tag = element(store, { tag: "a", name: "tag" });

    return component(Tag, ({ slug }) => <Tag href={`/tags/${slug}`}>{tag_map[slug] || slug}</Tag>);
}
