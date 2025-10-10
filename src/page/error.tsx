import type { HNode } from "@/lib/core/component";
import type { Store } from "@/lib/core/store";
import { page } from "@/page/page";

export function ErrorPage(store: Store, arg: { name: string; cause: string }): HNode {
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

export function InternalServerErrorPage(store: Store, error: Error): HNode {
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
