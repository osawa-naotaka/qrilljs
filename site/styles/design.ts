import type { ColorCategory, ComponentFn, PropBase, Selector, Store, StyleRule } from "qrilljs/core";
import { colorof, S_SMALL, S_TINY, style } from "qrilljs/core";

export function TAG_DESIGN<T extends PropBase>(store: Store, cat: ColorCategory, top: ComponentFn<T>): StyleRule[] {
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
