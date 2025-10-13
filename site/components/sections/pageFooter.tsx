import type { HComponentFn, Store } from "qrilljs/core";
import { colorof, component, element, registerStyle, S_MEDIUM, style } from "qrilljs/core";

export type PageFooterArgument = {
    site_name: string;
};

export function pageFooter(store: Store): HComponentFn<PageFooterArgument> {
    const PageFooter = element(store, { tag: "footer", name: "page-footer" });
    const Content = element(store);
    const Copyright = element(store);

    const component_styles = [
        style(PageFooter)({
            position: "sticky",
            bottom: "0",
            left: "0",
            width: "100%",
            color: colorof(store, "text_secondary"),
            background_color: colorof(store, "background_secondary"),
        }),
        style(Content)({
            position: "relative",
            display: "flex",
            flex_direction: "column",
            align_items: "center",
            gap: S_MEDIUM(store),
        }),
        style(Copyright)({ text_align: "center" }),
    ];

    registerStyle(store, PageFooter, component_styles);

    return component(PageFooter, ({ site_name }) => (
        <PageFooter>
            <Content />
            <Copyright>{`© 2025 ${site_name}`}</Copyright>
        </PageFooter>
    ));
}
