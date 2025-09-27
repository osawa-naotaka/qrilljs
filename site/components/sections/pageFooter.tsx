import { colorof, component, element, registerComponent, S_MEDIUM, style } from "qrill/core";
import type { HComponentFn, Store } from "qrill/core";
import {
    ABSOLUTE_ANCHOR,
    FIX_BOTTOM,
} from "qrill/core";

export type PageFooterArgument = {
    site_name: string;
};

export function pageFooter(store: Store): HComponentFn<PageFooterArgument> {
    const PageFooter = element("page-footer", { tag: "footer" });
    const Content = element("page-footer-content");
    const Copyright = element("page-footer-copyright");

    const component_styles = [
        style(PageFooter)(
            FIX_BOTTOM,
            {
                color: colorof(store, "text_secondary"),
                background_color: colorof(store, "background_secondary"),
            }
        ),
        style(Content)(
            {
                display: "flex",
                flex_direction: "column",
                align_items: "center",
                gap: S_MEDIUM(store),
            },
            ABSOLUTE_ANCHOR
        ),
        style(Copyright)({ text_align: "center" }),
    ];

    registerComponent(store, PageFooter, component_styles);

    return component(PageFooter, ({ site_name }) => (
        <PageFooter>
            <Content />
            <Copyright>{`© 2025 ${site_name}`}</Copyright>
        </PageFooter>
    ));
}
