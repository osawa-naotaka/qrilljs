import type { ComponentFn, H1Attribute, Store } from "qrilljs/core";
import { component, element } from "qrilljs/core";

export function siteTitle(store: Store): ComponentFn<Partial<H1Attribute>> {
    const SiteTitle = element(store, { tag: "h1", name: "site-title" });
    return component(SiteTitle, () => (
        <SiteTitle>
            <a href="/">{child}</a>
        </SiteTitle>
    ));
}
