import { link } from "@site/components/element/link";
import type { HComponentFn, HSvgBrandsIconName, Store } from "qrilljs/core";
import { component, element, F_XLARGE, faSvgIconStore, registerStyle, S_XLARGE, style } from "qrilljs/core";

export type NavigationArgument = {
    navitem: {
        url: string;
        icon: HSvgBrandsIconName;
    }[];
};

export function navigation(store: Store): HComponentFn<NavigationArgument> {
    const Navigation = element(store, { tag: "nav", name: "navigation" });
    const Link = link(store);
    const icons: HSvgBrandsIconName[] = ["youtube", "x-twitter", "github"];
    const SvgIconStore = faSvgIconStore(
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

    registerStyle(store, Navigation, component_styles);

    return component(Navigation, ({ navitem }) => (
        <Navigation>
            <Link href="/posts">blog</Link>
            {navitem.map((item) => (
                <Link href={item.url} target="__blank" key={item.url}>
                    <SvgIconStore type="brands" name={item.icon} />
                </Link>
            ))}
        </Navigation>
    ));
}
