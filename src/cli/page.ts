import type { RootPageFn } from "@/core";
import type { Store } from "../lib/core/store";

export async function importPage<T>(
    store: Store,
    page: (store: Store) => RootPageFn<T>,
): Promise<{ pageFn: RootPageFn<T>; element_count: number }> {
    const pageFn = page(store);
    const element_count = store.element_count;

    const js_files = Array.from(store.components.values())
        .map((x) => x.attachment?.script)
        .filter((x) => x !== undefined);

    for (const client of js_files) {
        const client_fn = require(client.replace("file://", ""));
        if (typeof client_fn.default === "function") {
            await client_fn.default(store);
        } else {
            console.warn(`importPage: import file "${client}" does not have default export.`);
        }
    }

    return { pageFn, element_count };
}
