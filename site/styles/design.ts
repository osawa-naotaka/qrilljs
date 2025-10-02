import { S_SMALL, S_TINY, colorof, style } from "qrilljs/core";
import type { ColorCategory, HComponentFn, Selector, Store, StyleRule } from "qrilljs/core";

export function TAG_DESIGN<T>(store: Store, cat: ColorCategory, top: HComponentFn<T>): StyleRule[] {
    return [
        style(top)({
            color: colorof(store, "background"),
            background_color: colorof(store, cat),
            border: "none",
            box_shadow: "none",
        }),
        style(top)({
            display: "inline-flex",
            font_weight: "bold",
            line_height: "1",
            overflow: "hidden",
            border_radius: "4px",
            cursor: "pointer",
            transition: "all 0.25s ease-in-out",
            padding: [S_TINY(store), S_SMALL(store)],
        }),
        style([top, ":hover"])({
            background_color: colorof(store, cat, "dark"),
        }),
    ];
}

export function LINK_DESIGN(...sel: Selector[]): StyleRule[] {
    return [
        style(...sel)({
            border: ["1px", "solid"],
        }),
    ];
}
