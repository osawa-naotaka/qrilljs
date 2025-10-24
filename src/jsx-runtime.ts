import type { ComponentFn, PropBase, QNode } from "./lib/core/component.ts";
import type { Tag, TagAttribute } from "./lib/core/element.ts";

export { Fragment } from "./lib/core/component.ts";

export namespace JSX {
    export interface IntrinsicElements extends IntrinsicElements_ {}
    export interface ElementChildrenAttribute {
        children: unknown;
    }
    export type Element = QNode;
}

export type Component<T extends PropBase> = string | ComponentFn<T>;

export type IntrinsicElements_ = { [key in keyof TagAttribute]: Partial<TagAttribute[key]> };

export function jsx<T extends PropBase>(elem: Component<T>, props: T): QNode {
    if (typeof elem === "string") {
        return {
            tag: elem as Tag,
            props,
        };
    }
    return elem(props);
}

export const jsxs = jsx;
