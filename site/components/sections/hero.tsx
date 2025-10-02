import { DEFAULT_RESPONSIVE_PAGE_WIDTH, S_2XLARGE, colorof } from "qrilljs/core";
import { component, element, registerComponent, style } from "qrilljs/core";
import type { HArgument, HComponentFn, Store } from "qrilljs/core";

export function hero(store: Store): HComponentFn<HArgument> {
    const Hero = element(store, "div", { name: "hero" });
    const HeroText = element(store);

    const component_styles = [
        style(Hero)({
            font_weight: "bold",
            font_style: "normal",
            margin_block: ["0", S_2XLARGE(store)],
            font_size: "min(17vw, 7rem)",
            line_height: "1.2",
        }),
        style(HeroText)(DEFAULT_RESPONSIVE_PAGE_WIDTH(store)),
        style(
            HeroText,
            "em",
        )({
            font_weight: "bold",
            font_style: "normal",
            color: colorof(store, "accent"),
        }),
    ];

    registerComponent(store, Hero, component_styles);

    return component(Hero, () => (
        <Hero>
            <HeroText>
                LULLIECA<em>T</em> IS <em>A</em>LIVE
            </HeroText>
        </Hero>
    ));
}
