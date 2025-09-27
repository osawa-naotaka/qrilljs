import type { HRootPageFn, Store } from "qrill/core";
import { siteTitle } from "../components/siteTitle";

export default function Root(_store: Store): HRootPageFn<void> {
    const SiteTitle = siteTitle();
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
