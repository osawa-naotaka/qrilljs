import type { PropBase, ComponentFn, Store } from "qrilljs/core";
import { colorof, component, element, registerStyle, S_2XLARGE, S_MEDIUM, style, W_MEDIUM } from "qrilljs/core";

export function hero(store: Store): ComponentFn<PropBase> {
    const Hero = element(store, { name: "hero" });
    const HeroText = element(store);

    const component_styles = [
        style(Hero)({
            font_weight: "bold",
            font_style: "normal",
            margin_block: ["0", S_2XLARGE(store)],
            font_size: "min(17vw, 7rem)",
            line_height: "1.2",
        }),
        style(HeroText)({
            max_width: W_MEDIUM(store),
            width: "100%",
            padding_inline: S_MEDIUM(store),
            margin_inline: "auto",
        }),
        style(
            HeroText,
            "em",
        )({
            font_weight: "bold",
            font_style: "normal",
            color: colorof(store, "accent"),
        }),
    ];

    registerStyle(store, Hero, component_styles);

    return component(Hero, () => (
        <Hero>
            <HeroText>
                LULLIECA<em>T</em> IS <em>A</em>LIVE
            </HeroText>
        </Hero>
    ));
}
