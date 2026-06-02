import type { ComponentFn, AttributeOf, Store } from "qrilljs/core";
import { component, element } from "qrilljs/core";

export function siteTitle(store: Store): ComponentFn<Partial<AttributeOf<"h1">>> {
    const SiteTitle = element(store, { tag: "h1", name: "site-title" });
    return component(SiteTitle, ({ children }) => (
        <SiteTitle>
            <a href="/">{children}</a>
        </SiteTitle>
    ));
}
