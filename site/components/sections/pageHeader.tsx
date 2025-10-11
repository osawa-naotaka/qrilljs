import { drawer } from "@site/components/module/drawer";
import { navigation } from "@site/components/module/navigation";
import { popover } from "@site/components/module/popover";
import { search } from "@site/components/module/search";
import { S_MEDIUM, W_MEDIUM, colorof, component, element, faSvgIconFont, registerStyle, style } from "qrilljs/core";
import type { HComponentFn, HSvgBrandsIconName, Store } from "qrilljs/core";
import { F_3XLARGE } from "qrilljs/core";

export type PageHeaderArgument = {
    title: string;
    navitem: {
        url: string;
        icon: HSvgBrandsIconName;
    }[];
};

export function pageHeader(store: Store): HComponentFn<PageHeaderArgument> {
    const PageHeader = element(store, "header", { name: "page-header" });
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
