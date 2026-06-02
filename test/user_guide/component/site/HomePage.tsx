import type { RootNodeFn, Store } from "qrilljs/core";
import { siteTitle } from "./components/siteTitle";

export function HomePage(store: Store): RootNodeFn<void> {
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
