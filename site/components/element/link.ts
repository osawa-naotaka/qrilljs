import type { AttributeOf, HComponentFn, Store } from "qrilljs/core";
import { colorof, component, element, registerStyle, style } from "qrilljs/core";

export function link(store: Store): HComponentFn<Partial<AttributeOf<"a">>> {
    const Link = element(store, { tag: "a", name: "link" });

    const styles = [
        style(Link)({ transition: ["all", "0.25s", "ease-in-out"] }),
        style([Link, ":hover"])({
            color: colorof(store, "text", "light"),
        }),
    ];

    registerStyle(store, Link, styles);

    return component(Link, Link);
}
