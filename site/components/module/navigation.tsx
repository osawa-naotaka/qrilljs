import { hlink } from "@site/components/element/hlink";
import { component, element, hSvgIconStore, registerComponent, style } from "qrill/core";
import type { HComponentFn, HSvgBrandsIconName, Store } from "qrill/core";
import { F_XLARGE, S_XLARGE } from "qrill/core";

export type NavigationArgument = {
    navitem: {
        url: string;
        icon: HSvgBrandsIconName;
    }[];
};

export function navigation(store: Store): HComponentFn<NavigationArgument> {
    const Navigation = element("navigation", { tag: "nav" });
    const HLink = hlink(store);
    const icons: HSvgBrandsIconName[] = ["youtube", "x-twitter", "github"];
    const HSvgIconStore = hSvgIconStore(
        store,
        icons.map((x) => ({ type: "brands", name: x })),
    );

    const component_styles = [
        style(Navigation)({
            font_size: F_XLARGE(store),
            font_weight: "bold",
            font_style: "normal",
            display: "flex",
            flex_direction: "row",
            align_items: "center",
            justify_content: "center",
            gap: S_XLARGE(store),
        }),
    ];

    registerComponent(store, Navigation, component_styles);

    return component(Navigation, ({ navitem }) => (
        <Navigation>
            <HLink href="/posts">blog</HLink>
            {navitem.map((item) => (
                <HLink href={item.url} target="__blank" key={item.url}>
                    <HSvgIconStore type="brands" name={item.icon} />
                </HLink>
            ))}
        </Navigation>
    ));
}
