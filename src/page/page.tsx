import type { HArgument, HComponentFn } from "@/lib/core/component";
import { component, element } from "@/lib/core/component";
import type { Store } from "@/lib/core/store";

const site = {
    lang: "en",
    name: "qrill",
    description: "fast, light-weight static site generator",
};

export function page(store: Store): HComponentFn<HArgument> {
    const PageHeader = element(store, { tag: "header", class: ["page-header", "content"] });
    const PageFooter = element(store, { tag: "footer", class: "page-footer" });
    const PageFooterCopyright = element(store, { class: "page-footer-copyright" });

    return component("html", (_attribute, ...children) => (
        <html lang={site.lang}>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                <title>{site.name}</title>
                <script type="module" src="/reload.js" />
                <link href="/qrill-error.css" rel="stylesheet" />
            </head>
            <body id="top-of-page" class="container">
                <PageHeader>
                    <h1>
                        <a href="/">{site.name}</a>
                    </h1>
                </PageHeader>
                {children}
                <PageFooter>
                    <PageFooterCopyright>&copy; 2025 {site.name}</PageFooterCopyright>
                </PageFooter>
            </body>
        </html>
    ));
}
