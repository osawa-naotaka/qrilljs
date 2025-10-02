import type { HRootPageFn, Store } from "qrilljs/core";
import { siteTitle } from "../components/siteTitle";

export default function Root(store: Store): HRootPageFn<void> {
    const SiteTitle = siteTitle(store);
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
