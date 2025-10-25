import type { BrandsIconName, ComponentFn, Store } from "qrilljs/core";
import { atStyle, colorof, component, INIT_CSS, registerStyle } from "qrilljs/core";
import { pageFooter } from "../sections/pageFooter.tsx";
import { pageHeader } from "../sections/pageHeader.tsx";
import { pageHead } from "./pageHead.tsx";

export type PageArgument = {
    title: string;
    description: string;
    lang: string;
    name: string;
    navitem: {
        url: string;
        icon: BrandsIconName;
    }[];
};

export function page(store: Store): ComponentFn<PageArgument> {
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

    return component("html", ({ lang, name, title, description, navitem, children }) => (
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
