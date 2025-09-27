import type { HNode } from "@/lib/core/component";
import { H2, Main, P, Pre } from "@/lib/core/elements";
import { page } from "@/page/page";

export function ErrorPage(arg: { name: string; cause: string }): HNode {
    const Page = page();
    return Page({}, Main({ class: "container" }, H2({}, arg.name), P({}, arg.cause)));
}

export function InternalServerErrorPage(error: Error): HNode {
    const Page = page();
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
