import { createRequire } from "node:module";
import { type DesignRule, generateStore, type PropBase, type RootPageFn, type Store } from "@/core";
import type { QrillConfig } from "./config";

export type ImportedRootPageFn = {
    default: RootPageFn<PropBase>;
    rootPageFnParameters?: () => Promise<Array<Record<string, string>>>;
};

export type ImportPageReturnValue = {
    root_page_fn?: ImportedRootPageFn;
    store: Store;
    client_element_count_start: number;
    any_page_fn_result?: string;
};

export async function importPage(
    path: string,
    config: QrillConfig,
    site_config: DesignRule,
): Promise<ImportPageReturnValue | null> {
    const require = createRequire(import.meta.url);

    const page_fn = await import(path);
    const store = generateStore(config.asset, site_config);

    if (typeof page_fn.default === "function") {
        const page_fn_result = await page_fn.default(store);
        if (typeof page_fn_result === "string") {
            return { store, client_element_count_start: 0, any_page_fn_result: page_fn_result };
        }

        const client_element_count_start = store.element_count;

        const js_files = Array.from(store.components.values())
            .map((x) => x.attachment?.script)
            .filter((x) => x !== undefined);

        for (const client of js_files) {
            const client_fn = require(client.replace("file://", ""));
            if (typeof client_fn.default === "function") {
                await client_fn.default(store);
            } else {
                console.warn(`importPage: import file "${client}" does not have default export.`);
                return null;
            }
        }

        return {
            store,
            client_element_count_start,
            root_page_fn: { default: page_fn_result, rootPageFnParameters: page_fn.rootPageFnParameters },
        };
    }

    console.warn(`importPage: import file "${path}" does not have default export.`);
    return null;
}
