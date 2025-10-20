import type { ComponentFn, Store } from "qrilljs/core";
import { colorof, component, element, faSvgIconFont, registerStyle, S_SMALL, S_TINY, style } from "qrilljs/core";
import { TAG_DESIGN } from "../../styles/design.ts";

export type ShareXArgument = {
    title: string;
    url: string;
};

export function shareX(store: Store): ComponentFn<ShareXArgument> {
    const ShareX = element(store, { tag: "a", name: "share-x" });
    const Text = element(store);
    const XIcon = faSvgIconFont(store, { type: "brands", name: "x-twitter" });

    const styles = [
        TAG_DESIGN(store, "background", ShareX),
        style(ShareX)({
            display: "flex",
            flex_direction: "row",
            align_items: "center",
            gap: "0",
            padding: "0",
            background_color: "transparent",
        }),
        style(XIcon)({
            display: "block",
            background_color: colorof(store, "background_secondary"),
            padding: [S_TINY(store), S_SMALL(store)],
        }),
        style(Text)({
            padding: [S_TINY(store), S_SMALL(store)],
            color: colorof(store, "text"),
            background_color: "transparent",
            box_shadow: ["0", "0", "0", "2px", "inset"],
            border_radius: ["0", "4px", "4px", "0"],
        }),
    ];

    registerStyle(store, ShareX, styles);

    return component(ShareX, ({ title, url }) => {
        const href = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

        return (
            <ShareX href={href} target="__blank">
                <XIcon />
                <Text>SHARE</Text>
            </ShareX>
        );
    });
}
