import type { ComponentFn, HSvgBrandsIconName, Store } from "qrilljs/core";
import {
    colorof,
    component,
    element,
    F_3XLARGE,
    faSvgIconFont,
    registerStyle,
    S_MEDIUM,
    style,
    W_MEDIUM,
} from "qrilljs/core";
import { drawer } from "../module/drawer.tsx";
import { navigation } from "../module/navigation.tsx";
import { popover } from "../module/popover.tsx";
import { search } from "../module/search.tsx";

export type PageHeaderArgument = {
    title: string;
    navitem: {
        url: string;
        icon: HSvgBrandsIconName;
    }[];
};

export function pageHeader(store: Store): ComponentFn<PageHeaderArgument> {
    const PageHeader = element(store, { tag: "header", name: "page-header" });
    const Drawer = drawer(store, "page-header-toggle-button");
    const Popover = popover(store);
    const Navigation = navigation(store);
    const Search = search(store);

    const PopoverOpenButton = faSvgIconFont(store, { type: "solid", name: "magnifying-glass" });
    const PopoverCloseButton = faSvgIconFont(store, { type: "solid", name: "xmark" });
    const DrawerOpenButton = faSvgIconFont(store, { type: "solid", name: "bars" });

    const component_styles = [
        style(PageHeader)({
            position: "sticky",
            top: "0",
            left: "0",
            width: "100%",
            color: colorof(store, "text"),
            background_color: colorof(store, "background"),
            opacity: "0.8",
        }),
        style(Drawer)({
            max_width: W_MEDIUM(store),
            width: "100%",
            padding_inline: S_MEDIUM(store),
            margin_inline: "auto",
        }),
        style("h1")({ font_size: F_3XLARGE(store) }),
    ];

    registerStyle(store, PageHeader, component_styles);

    return component(PageHeader, ({ title, navitem }) => (
        <PageHeader>
            <Drawer
                title={
                    <h1>
                        <a href="/">{title}</a>
                    </h1>
                }
                header_space={
                    <Popover
                        open_button={<PopoverOpenButton />}
                        close_button={<PopoverCloseButton />}
                        body={<Search />}
                    />
                }
                open_button={<DrawerOpenButton />}
                content={<Navigation navitem={navitem} />}
            />
        </PageHeader>
    ));
}
