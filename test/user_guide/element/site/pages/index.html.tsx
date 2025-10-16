import type { RootPageFn, Store } from "qrilljs/core";
import { element } from "qrilljs/core";

export default function Root(store: Store): RootPageFn<void> {
    const SiteTitle = element(store, { tag: "h1", name: "site-title" });
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
