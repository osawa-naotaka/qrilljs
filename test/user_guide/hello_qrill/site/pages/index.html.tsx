import type { RootPageFn, Store } from "qrilljs/core";

export default function Root(_store: Store): RootPageFn<void> {
    return async () => (
        <html lang="en">
            <head>
                <title>Hello, qrill!</title>
            </head>
            <body>
                <h1>Hello, qrill!</h1>
            </body>
        </html>
    );
}
