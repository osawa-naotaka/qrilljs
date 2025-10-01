import type { AssetConfig } from "@/cli/config";
import type { HComponentFn, HNode } from "@/lib/core/component";
import { default_design_rule } from "@/lib/core/design";
import type { DesignRule } from "@/lib/core/design";
import type { Selector, StyleRule } from "@/lib/core/style";
import type { RecursivePartial } from "@/lib/core/util";
import { cloneAndMergeRecord, hash_djb2 } from "@/lib/core/util";

// qrill element data structure for register element to repository, internal use only.
export type HComponent = {
    component_name: string;
    style: StyleRule[];
    attachment?: HComponentAttachment;
};

export type HComponentAttachment = {
    script?: string;
    assets?: HComponentAsset[];
    inserts?: HComponentInsert[];
    fonts?: HIconFontCharacter[];
};

export type HComponentAsset = {
    package_name?: string;
    copy_files: {
        src: string;
        dist: string;
    }[];
};

export type HIconFontCharacter = {
    package_name?: string;
    chars: {
        src: string;
        name: string;
    }[];
};

export type HComponentInsert = {
    selector: Selector[];
    nodes: HNode[];
};

export type Store = {
    components: Map<string, HComponent>;
    element_count: number;
    designrule: DesignRule;
    asset: AssetConfig;
};

export function generateStore(asset: AssetConfig, rule: RecursivePartial<DesignRule> = {}, element_count = 0): Store {
    return {
        components: new Map<string, HComponent>(),
        element_count,
        designrule: cloneAndMergeRecord(default_design_rule, rule),
        asset,
    };
}

export function registerComponent<K>(
    store: Store,
    name_fn: HComponentFn<K> | string,
    raw_style: (StyleRule | StyleRule[])[],
    attachment?: HComponentAttachment,
): void {
    const component_name = typeof name_fn === "string" ? name_fn : name_fn.name;
    const style = raw_style.flatMap((x) => (Array.isArray(x) ? x : [x]));

    store.components.set(component_name, { component_name, style, attachment });
}

export function registerRootPage(
    store: Store,
    raw_style: (StyleRule | StyleRule[])[],
    attachment?: HComponentAttachment,
): void {
    const component_name = "qrill-root-page";
    const style = raw_style.flatMap((x) => (Array.isArray(x) ? x : [x]));

    store.components.set(component_name, { component_name, style, attachment });
}

export function name_with_one_time_hash(store: Store, name: string): string {
    const obj = { name, element_count: store.element_count++ };
    return `${name}-${hash_djb2(obj).toString(16)}`;
}
