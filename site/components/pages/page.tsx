import { pageHead } from "@site/components/pages/pageHead";
import { pageFooter } from "@site/components/sections/pageFooter";
import { pageHeader } from "@site/components/sections/pageHeader";
import { atStyle, colorof, component, registerStyle } from "qrilljs/core";
import type { HComponentFn, HSvgBrandsIconName, Store } from "qrilljs/core";
import { INIT_CSS } from "qrilljs/core";

export type PageArgument = {
    title: string;
    description: string;
    lang: string;
    name: string;
    navitem: {
        url: string;
        icon: HSvgBrandsIconName;
    }[];
};

export function page(store: Store): HComponentFn<PageArgument> {
    const PageHead = pageHead();
    const PageHeader = pageHeader(store);
    const PageFooter = pageFooter(store);

    const styles = [
        INIT_CSS,
        atStyle(["@layer", "base"])(":root")({
            font_size: store.designrule.font.base_size,
            line_height: store.designrule.font.line_height,
            font_family: store.designrule.font.family.join(", "),
        }),
        atStyle(["@layer", "base"])("body")({
            background_color: colorof(store, "background"),
            color: colorof(store, "text"),
        }),
    ];

    registerStyle(store, "html", styles);

    return component("html", ({ lang, name, title, description, navitem }, ...children) => (
        <html lang={lang}>
            <PageHead title={title} description={description} />
            <body>
                <PageHeader title={name} navitem={navitem} />
                {children}
                <PageFooter site_name={name} />
            </body>
        </html>
    ));
}
