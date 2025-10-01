import type { AttributeOf, HComponentFn, Store } from "qrill/core";
import { colorof, component, element, registerComponent, style } from "qrill/core";

export function hlink(store: Store): HComponentFn<Partial<AttributeOf<"a">>> {
    const Link = element(store, "link", { tag: "a" });

    const styles = [
        style(Link)({ transition: ["all", "0.25s", "ease-in-out"] }),
        style([Link, ":hover"])({
            color: colorof(store, "text", "light"),
        }),
    ];

    registerComponent(store, Link, styles);

    return component(Link, Link);
}
