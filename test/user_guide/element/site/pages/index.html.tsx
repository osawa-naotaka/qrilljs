import type { HRootPageFn, Store } from "qrill/core";
import { element } from "qrill/core";

export default function Root(_store: Store): HRootPageFn<void> {
    const SiteTitle = element("site-title", { tag: "h1" });
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
