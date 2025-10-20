import { page } from "./page.tsx";
import type { QNode } from "../lib/core/component.ts";
import type { Store } from "../lib/core/store.ts";

export function ErrorPage(store: Store, arg: { name: string; cause: string }): QNode {
    const Page = page(store);

    return (
        <Page>
            <main class="container">
                <h2>{arg.name}</h2>
                <p>{arg.cause}</p>
            </main>
        </Page>
    );
}

export function InternalServerErrorPage(store: Store, error: Error): QNode {
    const Page = page(store);

    if (error.stack === undefined) {
        return (
            <Page>
                <main class="container">
                    <h2>Error on Dev Server</h2>
                    <p>{error.name}</p>
                    <p>{error.message}</p>
                    <p>{error.cause?.toString() || "no cause"}</p>
                </main>
            </Page>
        );
    }

    return (
        <Page>
            <main class="container">
                <h2>Error on Dev Server</h2>
                <pre>{error.stack || "no stack trace"}</pre>
            </main>
        </Page>
    );
}
