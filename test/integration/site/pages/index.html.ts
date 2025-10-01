import type { HRootPageFn, Store } from "qrilljs/core";
import page from "../components/page";
import { site } from "../site.config";

export default function Root(store: Store): HRootPageFn<void> {
    const Page = page(store);

    return async () => Page(site);
}
