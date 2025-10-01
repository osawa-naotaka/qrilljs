import type { HNode } from "@/lib/core/component";
import { H2, Main, P, Pre } from "@/lib/core/elements";
import type { Store } from "@/lib/core/store";
import { page } from "@/page/page";

export function ErrorPage(store: Store, arg: { name: string; cause: string }): HNode {
    const Page = page(store);
    return Page({}, Main({ class: "container" }, H2({}, arg.name), P({}, arg.cause)));
}

export function InternalServerErrorPage(store: Store, error: Error): HNode {
    const Page = page(store);
    if (error.stack === undefined) {
        return Page(
            {},
            Main(
                { class: "container" },
                H2({}, "500"),
                P({}, error.name),
                P({}, error.message),
                P({}, error.cause?.toString() || "no cause"),
            ),
        );
    }

    return Page({}, Main({ class: "container" }, H2({}, "500"), Pre({}, error.stack || "no stack trace")));
}
