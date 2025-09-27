import {
    component,
    element,
    registerComponent,
    style,
} from "qrill/core";
import type { HComponentFn, HNode, Store } from "qrill/core";

export type DrawerArgument = {
    title: HNode;
    header_space: HNode;
    open_button: HNode;
    content: HNode;
};

export function drawer(store: Store, button_id: string): HComponentFn<DrawerArgument> {
    const Drawer = element("drawer");
    const Title = element("drawer-title");
    const HeaderSpace = element("drawer-header-space");
    const Content = element("drawer-content");
    const OpenState = element("drawer-open-state", { tag: "input" });
    const OpenButton = element("drawer-open-button", { tag: "label" });

    const styles = [
        style(Drawer)({ overflow: "hidden" }),
        style(Title)(
            {
                display: "flex",
                flex_direction: "row",
                align_items: "center",
                justify_content: "space-between",
            },
        ),
        style(HeaderSpace)(
            {
                display: "flex",
                flex_direction: "row",
                align_items: "center",
                justify_content: "space-between",
            },
        ),
        style(OpenState)({ display: "none" }),
        style(OpenButton)({ cursor: "pointer" }),
        style(Content)(
            {
                height: "0",
                transition: "height 0.25s",
            }
        ),
        style([`#${button_id}`, ":checked"], "~", Content)(
            {
                height: "calc-size(fit-content, size)",
            }
        ),
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
