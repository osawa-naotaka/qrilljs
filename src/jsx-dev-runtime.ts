import type { Children, PropBase, QNode } from "@/lib/core/component";
import type { Component, IntrinsicElements_ } from "./jsx-runtime";
import { jsx } from "./jsx-runtime";

export namespace JSX {
    export interface IntrinsicElements extends IntrinsicElements_ {}
    export interface ElementChildrenAttribute {
        children: unknown;
    }
    export type Element = QNode;
}

export function jsxDEV<T extends PropBase>(
    element: Component<T>,
    props: T & { children?: Children },
    _key: string | number | undefined,
    _isStaticChildren: boolean,
    _source: { fileName: string; lineNumber: number; columnNumber: number } | undefined,
    // biome-ignore lint:lint/suspicious/noExplicitAny
    _self: any | undefined,
): QNode {
    return jsx(element, props);
}

export const jsxsDEV = jsxDEV;
