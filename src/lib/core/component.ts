import type { Store } from "@/lib/core/store";
import { name_with_one_time_hash } from "@/lib/core/store";
import { addClassInRecord } from "@/lib/core/util";
import type { AttributeOf, QrillTag, Tag } from "./element";

export type QElement<T extends PropBase = PropBase> = {
    tag: Tag;
    props: Partial<T> & { children?: Children; key?: string | number; class?: string | string[] };
};

export type QNode = string | QElement | boolean | null | undefined;

export type Child = QNode;
export type Children = Child | readonly Child[] | readonly Children[];

export type QElementProps<T extends Tag> = Partial<AttributeOf<T>> & {
    children?: Children;
    key?: string | number;
};

export type QElementFn<T extends Tag> = {
    (props: Partial<AttributeOf<T>>): QElement<AttributeOf<T>>;
    designator: string;
};

export type Designator = {
    designator: string;
};

export type QElementArgument<T extends Tag> = {
    tag?: T;
    class?: string | string[];
    name?: string;
};

export function element<T extends Tag | QrillTag>(store: Store, arg: QElementArgument<T> = {}): QElementFn<T> {
    const name_with_hash = name_with_one_time_hash(store, arg.name || "qrill");
    const dot_name = `.${name_with_hash}`;
    const class_name = arg.class === undefined ? [] : typeof arg.class === "string" ? [arg.class] : arg.class;
    if (arg.name) {
        class_name.push(arg.name);
    }
    return Object.assign(
        (props: QElementProps<T>) => ({
            tag: arg.tag || ("div" as const),
            props: addClassInRecord(props, [name_with_hash, ...class_name]),
        }),
        {
            designator: dot_name,
        },
    );
}

export function simpleElement<T extends Tag>(tag: T): QElementFn<T> {
    return Object.assign(
        (props: QElementProps<T>) => ({
            tag: tag || ("div" as const),
            props,
        }),
        {
            designator: tag,
        },
    );
}

export type PropBase = Record<string, unknown>;

export type ComponentProps<K extends PropBase> = K & {
    children?: Children;
    key?: string | number;
};

export type ComponentRawFn<K extends PropBase> = (props: ComponentProps<K>) => QNode;
export type ComponentFn<K extends PropBase = PropBase> = {
    (props: ComponentProps<K>): QNode;
    designator: string;
};

// biome-ignore lint: lint/suspicious/noExplicitAny
export type AnyComponentFn = ComponentFn<any>;

// if name_fn is string, it refers html elemen name like html, body, p..., so we don't use dottend name for that.
export function component<T extends PropBase>(
    name_fn: ComponentFn | string,
    component_fn: ComponentRawFn<T>,
): ComponentFn<T> {
    const component_name = typeof name_fn === "string" ? `.${name_fn}` : name_fn.designator;
    return Object.assign((props: ComponentProps<T>) => component_fn(props), {
        designator: component_name,
    });
}

// qrill HTML Top export function
export type RootPageFn<T> = (parameter: T) => Promise<QNode>;

// qrill Client FUnction
export type ClientFn = (root: Element) => Promise<void>;
