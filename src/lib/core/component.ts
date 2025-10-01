import type { AttributeMap, Tag, qrillTag } from "@/lib/core/elements";
import { Class } from "@/lib/core/elements";
import { type Store, name_with_one_time_hash } from "@/lib/core/store";
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
    child: HNode[];
};

// qrill Element (is function), expressing HTML element
export type HElementFn<K> = (attribute: AttributeOf<K>, ...child: HNode[]) => HNode;

export type ElementArg<K> = {
    class?: string | string[];
    tag?: K;
};

export function element<K extends Tag | qrillTag = "div">(
    store: Store,
    element_name: string,
    arg: ElementArg<K> = {},
): HElementFn<K> {
    const name_with_hash = name_with_one_time_hash(store, element_name);
    const dot_name = `.${name_with_hash}`;
    const class_name = arg.class === undefined ? [] : typeof arg.class === "string" ? [arg.class] : arg.class;
    return {
        [dot_name]: (attribute: AttributeOf<K>, ...child: HNode[]) => ({
            tag: arg.tag || ("div" as const),
            attribute: addClassInRecord(attribute, [name_with_hash, ...class_name]),
            child,
        }),
    }[dot_name];
}

// qrill Component (is function)
export type HComponentFn<T> = (argument: HComponentFnArg<T>, ...child: HNode[]) => HNode;
// biome-ignore lint: using any.
export type HComponentFnArg<T> = T & { class?: string | string[]; id?: string; children?: any; key?: any };

// if name_fn is string, it refers html elemen name like html, body, p..., so we don't use dottend name for that.
export function component<K, T>(name_fn: HComponentFn<K> | string, component_fn: HComponentFn<T>): HComponentFn<T> {
    const component_name = typeof name_fn === "string" ? name_fn : name_fn.name;
    return {
        [component_name]: (argument: HComponentFnArg<T>, ...child: HNode[]) => component_fn(argument, ...child),
    }[component_name];
}

// biome-ignore lint/suspicious/noExplicitAny: HAnyComponent uses only for function.name
export type HAnyComponentFn = HComponentFn<any>;

export type HArgument = Record<string, unknown>;

export function as<T>(class_name: string, fn: HComponentFn<T>): HComponentFn<T> {
    const dot_name = `.${class_name}`;
    return {
        [dot_name]: (argument: HComponentFnArg<T>, ...child: HNode[]) =>
            Class({ class: class_name }, fn(argument, ...child)),
    }[dot_name];
}

// qrill HTML Top export function
export type HRootPageFn<T> = (parameter: T) => Promise<HNode>;

// qrill Client FUnction
export type HClientFn = () => Promise<void>;
