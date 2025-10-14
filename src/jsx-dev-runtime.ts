import type { Children, PropBase, QNode } from "@/lib/core/component";
import type { Component, IntrinsicElements_ } from "./jsx-runtime";
import { jsx } from "./jsx-runtime";

export namespace JSX {
    export interface IntrinsicElements extends IntrinsicElements_ {}
}

export function jsxDEV<T extends PropBase>(
    element: Component<T>,
    props: T & { children?: Children },
    // biome-ignore lint: using any.
    _d1: any,
    // biome-ignore lint: using any.
    _d2: any,
    // biome-ignore lint: using any.
    _d3: any,
    // biome-ignore lint: using any.
    _d4: any,
): QNode {
    return jsx(element, props);
}

export const jsxsDEV = jsxDEV;
