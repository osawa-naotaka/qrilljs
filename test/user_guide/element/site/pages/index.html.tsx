import type { HRootPageFn, Store } from "qrill/core";
import { element } from "qrill/core";

export default function Root(_store: Store): HRootPageFn<void> {
    const SiteTitle = element(store, { tag: "h1" }, "site-title");
    return async () => (
        <html lang="en">
            <head>
                <title>Hello, qrill!</title>
            </head>
            <body>
                <SiteTitle>Hello, qrill!</SiteTitle>
            </body>
        </html>
    );
}
