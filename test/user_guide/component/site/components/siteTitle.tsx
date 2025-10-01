import { component, element } from "qrilljs/core";
import type { H1Attribute, HComponentFn } from "qrilljs/core";

export function siteTitle(): HComponentFn<Partial<H1Attribute>> {
    const SiteTitle = element(store, { tag: "h1" }, "site-title");
    return component(SiteTitle, (_attr, ...child) => (
        <SiteTitle>
            <a href="/">{child}</a>
        </SiteTitle>
    ));
}
