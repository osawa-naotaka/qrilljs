import type { Children, ComponentFn, PropBase, QNode } from "@/lib/core/component";
import type { Tag, TagAttribute } from "@/lib/core/element";

export namespace JSX {
    export interface IntrinsicElements extends IntrinsicElements_ {}
}

export type Component<T extends PropBase> = string | ComponentFn<T>;

export type IntrinsicElements_ = { [key in keyof TagAttribute]: Partial<TagAttribute[key]> };

export namespace JSX {
    export interface IntrinsicElements extends IntrinsicElements_ {}
}

export function jsx<T extends PropBase>(elem: Component<T>, props: T & { children?: Children }): QNode {
    if (typeof elem === "string") {
        return {
            tag: elem as Tag,
            props,
        };
    }
    const result = elem(props);
    return result;
}

export const jsxs = jsx;
