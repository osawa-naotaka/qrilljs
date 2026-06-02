import type { RootNodeFn, Store } from "qrilljs/core";

export function HomePage(_store: Store): RootNodeFn<void> {
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
