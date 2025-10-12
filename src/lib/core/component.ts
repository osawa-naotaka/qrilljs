import type { AttributeMap, Tag, qrillTag } from "@/lib/core/elements";
import { gt } from "@/lib/core/elements";
import type { Store } from "@/lib/core/store";
import { name_with_one_time_hash } from "@/lib/core/store";
import { addClassInRecord } from "@/lib/core/util";

// Attribute of HTML Element
export type AttributeValue = string | string[] | null | undefined;
export type Attribute = Record<string, AttributeValue>;
export type AttributeOf<K> = Partial<AttributeMap[K & keyof AttributeMap]>;

// HTML DOM Node = string or HTML Element
export type HNode<T extends Attribute = Attribute> = string | HElement<T>;

// HTML Element, with custom element name
export type HElement<K> = {
    tag: Tag | qrillTag;
    attribute: Partial<K>;
    children: HNode[];
};

// qrill Element (is function), expressing HTML element
export type HElementFn<K> = {
    (attribute: AttributeOf<K>, ...children: HNode[]): HNode;
    designator: string;
};

export type ElementArg = {
    class?: string | string[];
    name?: string;
};

export function element<K extends Tag | qrillTag>(store: Store, tag?: K, arg: ElementArg = {}): HElementFn<K> {
    const name_with_hash = name_with_one_time_hash(store, arg.name || "qrill");
    const dot_name = `.${name_with_hash}`;
    const class_name = arg.class === undefined ? [] : typeof arg.class === "string" ? [arg.class] : arg.class;
    return Object.assign(
        {
            [dot_name]: (attribute: AttributeOf<K>, ...children: HNode[]) => ({
                tag: tag || ("div" as const),
                attribute: addClassInRecord(attribute, [name_with_hash, ...class_name]),
                children,
            }),
        }[dot_name],
        {
            designator: dot_name,
        },
    );
}

export type HComponentRawFn<T> = (argument: HComponentFnArg<T>, ...children: HNode[]) => HNode;

// qrill Component (is function)
export type HComponentFn<T> = {
    (argument: HComponentFnArg<T>, ...children: HNode[]): HNode;
    designator: string;
};
// biome-ignore lint: using any.
export type HComponentFnArg<T> = T & { class?: string | string[]; id?: string; children?: any; key?: any };

// if name_fn is string, it refers html elemen name like html, body, p..., so we don't use dottend name for that.
export function component<K, T>(name_fn: HComponentFn<K> | string, component_fn: HComponentRawFn<T>): HComponentFn<T> {
    const component_name = typeof name_fn === "string" ? `.${name_fn}` : name_fn.designator;
    return Object.assign(
        {
            [component_name]: (argument: HComponentFnArg<T>, ...children: HNode[]) =>
                component_fn(argument, ...children),
        }[component_name],
        {
            designator: component_name,
        },
    );
}

// biome-ignore lint/suspicious/noExplicitAny: HAnyComponent uses only for function.name
export type HAnyComponentFn = HComponentFn<any>;

export type HArgument = Record<string, unknown>;

export function as<T>(class_name: string, fn: HComponentFn<T>): HComponentFn<T> {
    const Class = gt("class");
    const dot_name = `.${class_name}`;
    return Object.assign(
        {
            [dot_name]: (argument: HComponentFnArg<T>, ...children: HNode[]) =>
                Class({ class: class_name }, fn(argument, ...children)),
        }[dot_name],
        {
            designator: dot_name,
        },
    );
}

// qrill HTML Top export function
export type HRootPageFn<T> = (parameter: T) => Promise<HNode>;

// qrill Client FUnction
export type HClientFn = () => Promise<void>;
