import type { Store } from "@/lib/core/store";
import type { StyleRule } from "@/lib/core/style";
import { atStyle } from "@/lib/core/style";
import type { ColorVariant } from "./design";

export const INIT_CSS: StyleRule[] = /* @__PURE__*/ [
    {
        atrules: [["@layer", "base"]],
        selector: [["*"], [["*", ":before"]], [["*", ":after"]]],
        properties: {
            margin: "0",
            padding: "0",
            border: "0",
            box_sizing: "border-box",
            font: "inherit",
            color: "inherit",
            vertical_align: "baseline",
        },
    },
    {
        atrules: [["@layer", "base"]],
        selector: [["html"], ["body"]],
        properties: {
            height: "100%",
            font_size: "inherit",
            font_family: "inherit",
            line_height: "inherit",
            color: "inherit",
            background: "inherit",
        },
    },
    {
        atrules: [["@layer", "base"]],
        selector: [
            ["h1"],
            ["h2"],
            ["h3"],
            ["h4"],
            ["h5"],
            ["h6"],
            ["p"],
            ["blockquote"],
            ["pre"],
            ["figure"],
            ["figcaption"],
            ["ul"],
            ["ol"],
            ["li"],
            ["dl"],
            ["dt"],
            ["dd"],
            ["table"],
            ["th"],
            ["td"],
            ["form"],
            ["fieldset"],
            ["legend"],
            ["input"],
            ["textarea"],
            ["button"],
            ["article"],
            ["aside"],
            ["footer"],
            ["header"],
            ["nav"],
            ["section"],
            ["main"],
        ],
        properties: {
            all: "unset",
            display: "revert",
            font: "inherit",
            color: "inherit",
        },
    },
    atStyle(["@layer", "base"])("a")({
        all: "unset",
        color: "inherit",
        cursor: "pointer",
        text_decoration: "inherit",
    }),
    atStyle(["@layer", "base"])("button")({
        cursor: "pointer",
    }),
    {
        atrules: [["@layer", "base"]],
        selector: [["img"], ["video"], ["canvas"], ["svg"]],
        properties: {
            display: "block",
            max_width: "100%",
            height: "auto",
        },
    },
];

export type ColorCategory =
    | "primary"
    | "secondary"
    | "thirdary"
    | "forthary"
    | "accent"
    | "text"
    | "text_secondary"
    | "background"
    | "background_secondary"
    | "success"
    | "error"
    | "warning"
    | "info";

export type BrightnessVariant = "light" | "main" | "dark";

export function colorof(store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): string {
    const category = store.designrule.color.category[cat];
    const variant = category[val];

    return rgb(variant);
}

export function scolorof(store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): string {
    const category = store.designrule.color.category[cat];
    const variant = category[val];

    return rgb_sep(variant);
}

// shorthand from store
export const B_MAIN = (variant: ColorVariant) => rgb(variant.main);
export const B_LIGHT = (variant: ColorVariant) => rgb(variant.light);
export const B_DARK = (variant: ColorVariant) => rgb(variant.dark);

export const F_TINY = (store: Store) => store.designrule.size.font.tiny;
export const F_SMALL = (store: Store) => store.designrule.size.font.small;
export const F_MEDIUM = (store: Store) => store.designrule.size.font.medium;
export const F_LARGE = (store: Store) => store.designrule.size.font.large;
export const F_XLARGE = (store: Store) => store.designrule.size.font.xlarge;
export const F_2XLARGE = (store: Store) => store.designrule.size.font.x2large;
export const F_3XLARGE = (store: Store) => store.designrule.size.font.x3large;

export const S_TINY = (store: Store) => store.designrule.size.spacing.tiny;
export const S_SMALL = (store: Store) => store.designrule.size.spacing.small;
export const S_MEDIUM = (store: Store) => store.designrule.size.spacing.medium;
export const S_LARGE = (store: Store) => store.designrule.size.spacing.large;
export const S_XLARGE = (store: Store) => store.designrule.size.spacing.xlarge;
export const S_2XLARGE = (store: Store) => store.designrule.size.spacing.x2large;
export const S_3XLARGE = (store: Store) => store.designrule.size.spacing.x3large;

export const W_TINY = (store: Store) => store.designrule.size.width.tiny;
export const W_SMALL = (store: Store) => store.designrule.size.width.small;
export const W_MEDIUM = (store: Store) => store.designrule.size.width.medium;
export const W_LARGE = (store: Store) => store.designrule.size.width.large;
export const W_XLARGE = (store: Store) => store.designrule.size.width.xlarge;
export const W_2XLARGE = (store: Store) => store.designrule.size.width.x2large;
export const W_3XLARGE = (store: Store) => store.designrule.size.width.x3large;

export const B_LIGHTEST = (store: Store) => store.designrule.color.brightness.lightest;
export const B_LIGHTER = (store: Store) => store.designrule.color.brightness.light;
export const B_DARKER = (store: Store) => store.designrule.color.brightness.dark;
export const B_DARKEST = (store: Store) => store.designrule.color.brightness.darkest;

export function color_mix(color_a: string, color_b: string): (persent: string) => string {
    return (persent) => `color-mix(in srgb, ${color_a} ${persent}, ${color_b})`;
}

export function rgb(color: [number, number, number]): string {
    return `rgb(${rgb_sep(color)})`;
}

export function rgb_sep(color: [number, number, number]): string {
    return `${color[0]} ${color[1]} ${color[2]}`;
}
