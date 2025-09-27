import { atStyle, colorof, component, element, registerComponent, style } from "qrill/core";
import type { HComponentFn, HNode, Store } from "qrill/core";
import {
    DEFAULT_RESPONSIVE_PAGE_WIDTH,
    FULL_WIDTH_HEIGHT,
    S_MEDIUM,
} from "qrill/core";

export type PopoverArgument = {
    open_button: HNode;
    close_button: HNode;
    body: HNode;
};

export function popover(store: Store, button_id: string): HComponentFn<PopoverArgument> {
    const Popover = element("popover");
    const Button = element("popover-button", { tag: "button" });
    const CloseArea = element("popover-close-area");
    const Container = element("popover-container");
    const Content = element("popover-content");

    const styles = [
        style(Container)(
            FULL_WIDTH_HEIGHT,
            {
                padding_block: S_MEDIUM(store),
                background_color: colorof(store, "background"),
                border: "none",
                opacity: "0",
                display: "none",
                transition: ["all", "0.25s", "allow-discrete"],
            }
        ),
        style([Container, ":popover-open"])(
            {
                display: "flex",
                flex_direction: "column",
                align_items: "center",
                gap: S_MEDIUM(store),
                opacity: "1",
            },
        ),
        atStyle(["@layer", "high"], ["@starting-style"])([Container, ":popover-open"])({ opacity: "0" }),
        style(Content)(DEFAULT_RESPONSIVE_PAGE_WIDTH(store)),
        style(Button)(
            {
                border: "none",
                cursor: "pointer",
                font_size: "inherit",
            }
        ),
        style(CloseArea)(
            {
                margin_block: ["0", S_MEDIUM(store)],
                display: "flex",
                flex_direction: "row",
                align_items: "center",
                gap: S_MEDIUM(store),
                justify_content: "flex-end"
            }
        ),
    ];

    registerComponent(store, Popover, styles);

    return component(Popover, ({ open_button, close_button, body }) => (
        <Popover>
            <Button type="button" popovertarget={button_id}>
                {open_button}
            </Button>
            <Container popover={null} id={button_id}>
                <Content>
                    <CloseArea>
                        <Button type="button" popovertarget={button_id}>
                            {close_button}
                        </Button>
                    </CloseArea>
                    {body}
                </Content>
            </Container>
        </Popover>
    ));
}
