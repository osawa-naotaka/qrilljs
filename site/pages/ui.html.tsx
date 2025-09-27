import { element, hIcon, hSvgIconFont, registerRootPage, style, unionRecords } from "qrill/core";
import type { ColorCategory, HArgument, HRootPageFn, Properties, Store } from "qrill/core";
import {
    BOLD,
    BOX_ELEVATED,
    BOX_ELEVATED_EM_LIGHT,
    BOX_ELEVATED_EM_STRONG,
    BOX_FILLED,
    BOX_FILLED_EM_LIGHT,
    BOX_FILLED_EM_STRONG,
    BOX_OUTLINED,
    BOX_OUTLINED_EM_LIGHT,
    BOX_OUTLINED_EM_STRONG,
    BOX_TEXT,
    BOX_TEXT_EM_LIGHT,
    BOX_TEXT_EM_STRONG,
    BOX_TONAL,
    BOX_TONAL_EM_LIGHT,
    BOX_TONAL_EM_STRONG,
    DEFAULT_RESPONSIVE_PAGE_WIDTH,
    DEFAULT_STYLES,
    INIT_CSS,
    INLINE_FLEX,
    S_MEDIUM,
    S_SMALL,
} from "qrill/core";

export default function Root(store: Store): HRootPageFn<HArgument> {
    const BText = element("b-text");
    const BOutlined = element("b-outlined");
    const BTonal = element("b-tonal");
    const BFilled = element("b-filled");
    const BElevated = element("b-elevated");
    const Icon = hIcon(store);
    const GithubIcon = hSvgIconFont(store, { type: "brands", name: "github" });
    const XIcon = hSvgIconFont(store, { type: "brands", name: "x-twitter" });
    const YoutubeIcon = hSvgIconFont(store, { type: "brands", name: "youtube" });

    const kind: ColorCategory = "primary";

    const default_styles: Properties = unionRecords(
        INLINE_FLEX,
        BOLD,
        {
            padding: [S_SMALL(store), S_MEDIUM(store)],
            line_height: "1",
            overflow: "hidden",
            border_radius: "4px",
            cursor: "pointer",
            transition: "all 0.25s ease-in-out",
        },
    );

    const page_styles = [
        INIT_CSS,
        DEFAULT_STYLES(store),
        style("main")(
            DEFAULT_RESPONSIVE_PAGE_WIDTH(store),
            {
                display: "flex",
                flex_wrap: "wrap",
                gap: S_MEDIUM(store),
            }
        ),
        style(BText)(BOX_TEXT(store, kind), default_styles),
        style([BText, ":hover"])(BOX_TEXT_EM_LIGHT(store, kind)),
        style([BText, ":active"])(BOX_TEXT_EM_STRONG(store, kind)),

        style(BOutlined)(BOX_OUTLINED(store, kind), default_styles),
        style([BOutlined, ":hover"])(BOX_OUTLINED_EM_LIGHT(store, kind)),
        style([BOutlined, ":active"])(BOX_OUTLINED_EM_STRONG(store, kind)),

        style(BTonal)(BOX_TONAL(store, kind), default_styles),
        style([BTonal, ":hover"])(BOX_TONAL_EM_LIGHT(store, kind)),
        style([BTonal, ":active"])(BOX_TONAL_EM_STRONG(store, kind)),

        style(BFilled)(BOX_FILLED(store, kind), default_styles),
        style([BFilled, ":hover"])(BOX_FILLED_EM_LIGHT(store, kind)),
        style([BFilled, ":active"])(BOX_FILLED_EM_STRONG(store, kind)),

        style(BElevated)(BOX_ELEVATED(store, kind), default_styles),
        style([BElevated, ":hover"])(BOX_ELEVATED_EM_LIGHT(store, kind)),
        style([BElevated, ":active"])(BOX_ELEVATED_EM_STRONG(store, kind)),

        style(BFilled, ">", "*")({ display: "block" }),
        style(BFilled)({ gap: S_SMALL(store) }),
    ];

    registerRootPage(store, page_styles);

    return async () => (
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <meta name="generator" content="template-engine" />

                <title>ui test</title>
            </head>
            <body>
                <h2>
                    Buttons
                    <GithubIcon />
                    <Icon type="brands" name="github" />
                </h2>
                <main>
                    <BText>text</BText>
                    <BOutlined>outlined</BOutlined>
                    <BTonal>tonal</BTonal>
                    <BFilled>
                        <YoutubeIcon />
                        <XIcon />
                        <GithubIcon />
                        <Icon type="brands" name="youtube" />
                        <Icon type="brands" name="x-twitter" />
                        <Icon type="brands" name="github" />
                        <div>filled</div>
                    </BFilled>
                    <BElevated>elevated</BElevated>
                </main>
            </body>
        </html>
    );
}
