import type { ComponentFn, QNode, Store } from "qrilljs/core";
import { atStyle, colorof, component, element, registerStyle, S_MEDIUM, style, W_MEDIUM } from "qrilljs/core";

export type PopoverArgument = {
    open_button: QNode;
    close_button: QNode;
    body: QNode;
};

export function popover(store: Store): ComponentFn<PopoverArgument> {
    const Popover = element(store, { name: "popover" });
    const Button = element(store, { tag: "button" });
    const CloseArea = element(store);
    const Container = element(store);
    const Content = element(store);

    const styles = [
        style(Container)({
            width: "100%",
            height: "100svh",
            padding_block: S_MEDIUM(store),
            background_color: colorof(store, "background"),
            border: "none",
            opacity: "0",
            display: "none",
            transition: ["all", "0.25s", "allow-discrete"],
        }),
        style([Container, ":popover-open"])({
            display: "flex",
            flex_direction: "column",
            align_items: "center",
            gap: S_MEDIUM(store),
            opacity: "1",
        }),
        atStyle(["@layer", "high"], ["@starting-style"])([Container, ":popover-open"])({ opacity: "0" }),
        style(Content)({
            max_width: W_MEDIUM(store),
            width: "100%",
            padding_inline: S_MEDIUM(store),
            margin_inline: "auto",
        }),
        style(Button)({
            border: "none",
            cursor: "pointer",
            font_size: "inherit",
        }),
        style(CloseArea)({
            margin_block: ["0", S_MEDIUM(store)],
            display: "flex",
            flex_direction: "row",
            align_items: "center",
            gap: S_MEDIUM(store),
            justify_content: "flex-end",
        }),
    ];

    const popover_container_id = `container-${Container.designator}`;

    registerStyle(store, Popover, styles);

    return component(Popover, ({ open_button, close_button, body }) => (
        <Popover>
            <Button type="button" popovertarget={popover_container_id}>
                {open_button}
            </Button>
            <Container popover={null} id={popover_container_id}>
                <Content>
                    <CloseArea>
                        <Button type="button" popovertarget={popover_container_id}>
                            {close_button}
                        </Button>
                    </CloseArea>
                    {body}
                </Content>
            </Container>
        </Popover>
    ));
}
