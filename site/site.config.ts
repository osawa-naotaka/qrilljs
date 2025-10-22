import type { HSvgBrandsIconName } from "qrilljs/core";
import * as v from "valibot";

export const site = {
    lang: "ja",
    name: "lulliecat",
    description: "lulliecatは皆さまの新しい歩みを支えます",
};

export const navitem: { name: string; url: string; icon: HSvgBrandsIconName }[] = [
    { name: "github", url: "https://github.com/osawa-naotaka/", icon: "github" },
    { name: "x", url: "https://x.com/lulliecat", icon: "x-twitter" },
    { name: "youtube", url: "https://www.youtube.com/channel/UCUzbZRjQJSZtH715CR2OIXw", icon: "youtube" },
];

export const posts_dir = "site/contents/posts/";

export const tag_map = {
    techarticle: "Technology",
    staticseek: "staticseek",
} as const;

export type TagSlugType = keyof typeof tag_map;
export const tagSlugSchema = v.picklist(Object.keys(tag_map) as [TagSlugType, ...TagSlugType[]]);

export const postFmSchema = v.object({
    title: v.string(),
    author: v.string(),
    date: v.union([v.string(), v.date()]),
    tag: v.optional(v.array(tagSlugSchema)),
});

export type PostFm = v.InferInput<typeof postFmSchema>;
