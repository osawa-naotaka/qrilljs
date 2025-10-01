import { component, element, registerComponent, style } from "qrilljs/core";
import type { HComponentFn, HNode, Store } from "qrilljs/core";

export type DrawerArgument = {
    title: HNode;
    header_space: HNode;
    open_button: HNode;
    content: HNode;
};

export function drawer(store: Store, button_id: string): HComponentFn<DrawerArgument> {
    const Drawer = element(store, { tag: "div" }, "drawer");
    const Title = element(store, { tag: "div" }, "drawer-title");
    const HeaderSpace = element(store, { tag: "div" }, "drawer-header-space");
    const Content = element(store, { tag: "div" }, "drawer-content");
    const OpenState = element(store, { tag: "input" }, "drawer-open-state");
    const OpenButton = element(store, { tag: "label" }, "drawer-open-button");

    const styles = [
        style(Drawer)({ overflow: "hidden" }),
        style(Title)({
            display: "flex",
            flex_direction: "row",
            align_items: "center",
            justify_content: "space-between",
        }),
        style(HeaderSpace)({
            display: "flex",
            flex_direction: "row",
            align_items: "center",
            justify_content: "space-between",
        }),
        style(OpenState)({ display: "none" }),
        style(OpenButton)({ cursor: "pointer" }),
        style(Content)({
            height: "0",
            transition: "height 0.25s",
        }),
        style(
            [`#${button_id}`, ":checked"],
            "~",
            Content,
        )({
            height: "calc-size(fit-content, size)",
        }),
    ];

    registerComponent(store, Drawer, styles);

    return component(Drawer, ({ title, header_space, open_button, content }) => (
        <Drawer>
            <OpenState type="checkbox" id={button_id} />
            <Title>
                {title}
                <HeaderSpace>
                    {header_space}
                    <OpenButton for={button_id}>{open_button}</OpenButton>
                </HeaderSpace>
            </Title>
            <Content>{content}</Content>
        </Drawer>
    ));
}
