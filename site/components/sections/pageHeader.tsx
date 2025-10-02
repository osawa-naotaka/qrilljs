import { drawer } from "@site/components/module/drawer";
import { navigation } from "@site/components/module/navigation";
import { popover } from "@site/components/module/popover";
import { search } from "@site/components/module/search";
import { colorof, component, element, registerComponent, style, svgIconFont } from "qrilljs/core";
import type { HComponentFn, HSvgBrandsIconName, Store } from "qrilljs/core";
import { DEFAULT_RESPONSIVE_PAGE_WIDTH, FIX_TOP_STICKY, F_3XLARGE } from "qrilljs/core";

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

    const PopoverOpenButton = svgIconFont(store, { type: "solid", name: "magnifying-glass" });
    const PopoverCloseButton = svgIconFont(store, { type: "solid", name: "xmark" });
    const DrawerOpenButton = svgIconFont(store, { type: "solid", name: "bars" });

    const component_styles = [
        style(PageHeader)(FIX_TOP_STICKY, {
            color: colorof(store, "text"),
            background_color: colorof(store, "background"),
            opacity: "0.8",
        }),
        style(Drawer)(DEFAULT_RESPONSIVE_PAGE_WIDTH(store)),
        style("h1")({ font_size: F_3XLARGE(store) }),
    ];

    registerComponent(store, PageHeader, component_styles);

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
