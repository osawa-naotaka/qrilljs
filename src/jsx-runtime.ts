import type { ComponentFn, PropBase, QNode } from "@/lib/core/component";
import type { Tag, TagAttribute } from "@/lib/core/element";

export namespace JSX {
    export interface IntrinsicElements extends IntrinsicElements_ {}
}

export type Component<T extends PropBase> = string | ComponentFn<T>;

export type IntrinsicElements_ = { [key in keyof TagAttribute]: Partial<TagAttribute[key]> };

export namespace JSX {
    export interface IntrinsicElements extends IntrinsicElements_ {}
}

export function jsx<T extends PropBase>(elem: Component<T>, props: T & { children?: JSXChildren }): QNode {
    console.log("jsx called.");
    console.dir(elem, { depth: null });
    if (typeof elem === "string") {
        return {
            tag: elem as Tag,
            props,
        };
    }
    const result = elem(props);
    console.log("function call result:");
    console.dir(result, { depth: null });
    return result;
}

export const jsxs = jsx;
