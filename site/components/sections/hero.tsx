import { S_2XLARGE, S_MEDIUM, W_MEDIUM, colorof } from "qrilljs/core";
import { component, element, registerStyle, style } from "qrilljs/core";
import type { HArgument, HComponentFn, Store } from "qrilljs/core";

export function hero(store: Store): HComponentFn<HArgument> {
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
