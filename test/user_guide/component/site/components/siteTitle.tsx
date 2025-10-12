import { component, element } from "qrilljs/core";
import type { H1Attribute, HComponentFn, Store } from "qrilljs/core";

export function siteTitle(store: Store): HComponentFn<Partial<H1Attribute>> {
    const SiteTitle = element(store, "h1", { name: "site-title" });
    return component(SiteTitle, (_attr, ...children) => (
        <SiteTitle>
            <a href="/">{child}</a>
        </SiteTitle>
    ));
}
