import type { Properties } from "@/lib/core/properties";
import type { Store } from "@/lib/core/store";
import type { PropertyOf, StyleRule } from "@/lib/core/style";
import { atStyle } from "@/lib/core/style";
import type { ColorVariant } from "./design";

export const INIT_CSS: StyleRule[] = /* @__PURE__*/ [
    atStyle(["@layer", "base"])("*")({
        margin: "0",
        padding: "0",
        box_sizing: "border-box",
    }),
    atStyle(["@layer", "base"])("a")({
        text_decoration: "none",
        color: "inherit",
    }),
    {
        atrules: [["@layer", "base"]],
        selector: [["ul"], ["ol"], ["menu"]],
        properties: {
            list_style_type: "none",
        },
    },
    atStyle(["@layer", "base"])("input")({
        width: "100%",
        border: ["0", "none"],
        outline: "none",
    }),
    {
        atrules: [["@layer", "base"]],
        selector: [["img"], ["svg"]],
        properties: {
            max_width: "100%",
            display: "block",
        },
    },
];

export function DEFAULT_STYLES(store: Store) {
    return [
        atStyle(["@layer", "base"])(":root")({
            font_size: store.designrule.font.base_size,
            line_height: store.designrule.font.line_height,
            font_family: store.designrule.font.family.join(", "),
        }),
        atStyle(["@layer", "base"])("body")({
            background_color: rgb(store.designrule.color.category.background.main),
            color: rgb(store.designrule.color.category.text.main),
        }),
    ];
}

export const BOX_TEXT = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties => ({
    color: colorof(store, cat, val),
    background_color: "transparent",
    border: "none",
    box_shadow: "none",
});

export const BOX_TEXT_EM_LIGHT = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties =>
    BOX_EM_LIGHT(store, cat, val);

export const BOX_TEXT_EM_STRONG = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties =>
    BOX_EM_STRONG(store, cat, val);

export const BOX_OUTLINED = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties => ({
    color: colorof(store, cat, val),
    background_color: "transparent",
    border: "none",
    box_shadow: ["0", "0", "0", "1px", "inset", colorof(store, cat, val)],
});

export const BOX_OUTLINED_EM_LIGHT = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties =>
    BOX_EM_LIGHT(store, cat, val);

export const BOX_OUTLINED_EM_STRONG = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties =>
    BOX_EM_STRONG(store, cat, val);

export const BOX_TONAL = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties => ({
    color: MIX_BLACK(colorof(store, cat, val))("90%"),
    background_color: color_mix(colorof(store, cat, val), B_MAIN(C_BACKGROUND(store)))("35%"),
    border: "none",
    box_shadow: "none",
});

export const BOX_TONAL_EM_LIGHT = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties => ({
    background_color: color_mix(colorof(store, cat, val), B_MAIN(C_BACKGROUND(store)))("45%"),
});

export const BOX_TONAL_EM_STRONG = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties => ({
    background_color: color_mix(colorof(store, cat, val), B_MAIN(C_BACKGROUND(store)))("55%"),
});

export const BOX_FILLED = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties => ({
    color: B_MAIN(C_BACKGROUND(store)),
    background_color: colorof(store, cat, val),
    border: "none",
    box_shadow: "none",
});

export const BOX_FILLED_EM_LIGHT = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties => ({
    background_color: DARKER(store, cat, val),
});

export const BOX_FILLED_EM_STRONG = (
    store: Store,
    cat: ColorCategory,
    val: BrightnessVariant = "main",
): Properties => ({
    background_color: DARKEST(store, cat, val),
});

export const BOX_ELEVATED = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties => ({
    color: colorof(store, cat, val),
    background_color: color_mix(B_MAIN(C_BACKGROUND(store)), colorof(store, cat, val))(B_DARKER(store)),
    border: "none",
    box_shadow: ["0", "1px", "3px", `rgba(${scolorof(store, cat, val)} / 0.2)`],
});

export const BOX_ELEVATED_EM_LIGHT = (
    store: Store,
    cat: ColorCategory,
    val: BrightnessVariant = "main",
): Properties => ({
    box_shadow: ["0", "2px", "4px", `rgba(${scolorof(store, cat, val)} / 0.3)`],
});

export const BOX_ELEVATED_EM_STRONG = (
    store: Store,
    cat: ColorCategory,
    val: BrightnessVariant = "main",
): Properties => ({
    box_shadow: ["0", "4px", "8px", `rgba(${scolorof(store, cat, val)} / 0.4)`],
});

export const BOX_EM_LIGHT = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties => ({
    background_color: MIX_WHITE(colorof(store, cat, val))("15%"),
});

export const BOX_EM_STRONG = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main"): Properties => ({
    background_color: MIX_WHITE(colorof(store, cat, val))("25%"),
});

export const DARKER = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main") =>
    MIX_BLACK(colorof(store, cat, val))(B_DARKER(store));
export const DARKEST = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main") =>
    MIX_BLACK(colorof(store, cat, val))(B_DARKEST(store));
export const LIGHTER = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main") =>
    MIX_WHITE(colorof(store, cat, val))(B_LIGHTER(store));
export const LIGHTEST = (store: Store, cat: ColorCategory, val: BrightnessVariant = "main") =>
    MIX_WHITE(colorof(store, cat, val))(B_LIGHTEST(store));

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

export function RESPONSIVE_PAGE_WIDTH(
    max_width: PropertyOf<"max_width">,
    padding_inline: PropertyOf<"padding_inline">,
): Properties {
    return {
        max_width,
        width: "100%",
        padding_inline,
        margin_inline: "auto",
    };
}

export function DEFAULT_RESPONSIVE_PAGE_WIDTH(store: Store): Properties {
    return RESPONSIVE_PAGE_WIDTH(W_MEDIUM(store), S_MEDIUM(store));
}

export const FULL_WIDTH_HEIGHT: Properties = {
    width: "100%",
    height: "100svh",
};

export const BORDER_NONE: Properties = {
    border: ["0px", "none"],
};

export const INLINE_FLEX: Properties = {
    display: "inline-flex",
};

export function COLUMN(gap: PropertyOf<"gap">): Properties {
    return {
        display: "flex",
        flex_direction: "column",
        align_items: "center",
        gap,
    };
}

export function ROW(gap: PropertyOf<"gap">): Properties {
    return {
        display: "flex",
        flex_direction: "row",
        align_items: "center",
        gap,
    };
}

export const TEXT_UNDERLINE: Properties = {
    text_decoration: ["underline", "2px"],
    text_underline_offset: "5px",
};

export const FIX_BOTTOM_STICKY: Properties = {
    position: "sticky",
    bottom: "0",
    left: "0",
    width: "100%",
};

export const FIX_BOTTOM: Properties = {
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
};

export const FIX_TOP_STICKY: Properties = {
    position: "sticky",
    top: "0",
    left: "0",
    width: "100%",
};

export const FIX_TOP: Properties = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
};

export const TEXT_JUSTIFY: Properties = {
    overflow_wrap: "anywhere",
    text_align: "justify",
};

export const ABSOLUTE_ANCHOR: Properties = {
    position: "relative",
};

// font
export const BOLD: Properties = {
    font_weight: "bold",
    font_style: "normal",
};

export const ITALIC: Properties = {
    font_style: "italic",
    font_weight: "normal",
};

// color
export const MIX_WHITE = (color: string) => color_mix(color, "white");
export const MIX_BLACK = (color: string) => color_mix(color, "black");

// basic property settings
export function INVERT(n: string): Properties {
    return { filter: `invert(${n})` };
}

// shorthand from store
export const C_PRIMARY = (store: Store) => store.designrule.color.category.primary;
export const C_SECONDARY = (store: Store) => store.designrule.color.category.secondary;
export const C_THIRDARY = (store: Store) => store.designrule.color.category.thirdary;
export const C_FORTHARY = (store: Store) => store.designrule.color.category.forthary;
export const C_ACCENT = (store: Store) => store.designrule.color.category.accent;
export const C_TEXT = (store: Store) => store.designrule.color.category.text;
export const C_TEXT_SECONDARY = (store: Store) => store.designrule.color.category.text_secondary;
export const C_BACKGROUND = (store: Store) => store.designrule.color.category.background;
export const C_BACKGROUND_SECONDARY = (store: Store) => store.designrule.color.category.background_secondary;
export const C_ERROR = (store: Store) => store.designrule.color.category.error;
export const C_INFO = (store: Store) => store.designrule.color.category.info;
export const C_SUCCESS = (store: Store) => store.designrule.color.category.success;
export const C_WARNING = (store: Store) => store.designrule.color.category.warning;

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
