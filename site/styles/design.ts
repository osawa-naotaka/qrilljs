import { BOLD, BOX_FILLED, BOX_FILLED_EM_LIGHT, INLINE_FLEX, S_SMALL, S_TINY, style } from "qrill/core";
import type { ColorCategory, HComponentFn, Selector, Store, StyleRule } from "qrill/core";

export function TAG_DESIGN<T>(store: Store, cat: ColorCategory, top: HComponentFn<T>): StyleRule[] {
    return [
        style(top)(BOX_FILLED(store, cat)),
        style(top)(INLINE_FLEX, BOLD, {
            line_height: "1",
            overflow: "hidden",
            border_radius: "4px",
            cursor: "pointer",
            transition: "all 0.25s ease-in-out",
            padding: [S_TINY(store), S_SMALL(store)],
        }),
        style([top, ":hover"])(BOX_FILLED_EM_LIGHT(store, cat)),
    ];
}

export function LINK_DESIGN(...sel: Selector[]): StyleRule[] {
    return [
        style(...sel)({
            border: ["1px", "solid"],
        }),
    ];
}
