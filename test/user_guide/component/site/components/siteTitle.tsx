import { component, element } from "qrill/core";
import type { H1Attribute, HComponentFn } from "qrill/core";

export function siteTitle(): HComponentFn<Partial<H1Attribute>> {
    const SiteTitle = element(store, "site-title", { tag: "h1" });
    return component(SiteTitle, (_attr, ...child) => (
        <SiteTitle>
            <a href="/">{child}</a>
        </SiteTitle>
    ));
}
