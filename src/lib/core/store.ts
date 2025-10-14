import type { AssetConfig } from "@/cli/config";
import type { ComponentFn, QNode } from "@/lib/core/component";
import type { DesignRule } from "@/lib/core/design";
import { default_design_rule } from "@/lib/core/design";
import type { Selector, StyleRule } from "@/lib/core/style";
import type { RecursivePartial } from "@/lib/core/util";
import { cloneAndMergeRecord, hash_djb2 } from "@/lib/core/util";

// qrill element data structure for register element to repository, internal use only.
export type HComponent = {
    component_name: string;
    style: StyleRule[];
    attachment: HComponentAttachment;
};

export type HComponentAttachment = {
    script?: string;
    assets: HComponentAsset[];
    inserts: HComponentInsert[];
    fonts: HIconFontCharacter[];
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
    nodes: QNode[];
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

export function registerStyle(
    store: Store,
    name_fn: ComponentFn | string,
    raw_style: (StyleRule | StyleRule[])[],
): void {
    const component_name = typeof name_fn === "string" ? name_fn : name_fn.designator;
    const style = raw_style.flatMap((x) => (Array.isArray(x) ? x : [x]));

    const component = store.components.get(component_name);
    if (component === undefined) {
        store.components.set(component_name, {
            component_name,
            style,
            attachment: { assets: [], inserts: [], fonts: [] },
        });
    } else {
        const new_component: HComponent = {
            component_name: component_name,
            style: [...component.style, ...style],
            attachment: {
                assets: [],
                inserts: [],
                fonts: [],
            },
        };
        store.components.set(component_name, new_component);
    }

    return;
}

export function registerScript(store: Store, name_fn: ComponentFn | string, script: string): void {
    const component_name = typeof name_fn === "string" ? name_fn : name_fn.designator;

    const component = store.components.get(component_name);
    if (component === undefined) {
        store.components.set(component_name, {
            component_name,
            style: [],
            attachment: { script, assets: [], inserts: [], fonts: [] },
        });
    } else {
        const new_component: HComponent = {
            component_name: component_name,
            style: component.style,
            attachment: {
                script,
                assets: component.attachment.assets,
                inserts: component.attachment.inserts,
                fonts: component.attachment.fonts,
            },
        };
        store.components.set(component_name, new_component);
    }

    return;
}

export function registerAsset(store: Store, name_fn: ComponentFn | string, assets: HComponentAsset[]): void {
    const component_name = typeof name_fn === "string" ? name_fn : name_fn.designator;

    const component = store.components.get(component_name);
    if (component === undefined) {
        store.components.set(component_name, {
            component_name,
            style: [],
            attachment: { assets, inserts: [], fonts: [] },
        });
    } else {
        const new_component: HComponent = {
            component_name: component_name,
            style: component.style,
            attachment: {
                script: component.attachment.script,
                assets: [...component.attachment.assets, ...assets],
                inserts: component.attachment.inserts,
                fonts: component.attachment.fonts,
            },
        };
        store.components.set(component_name, new_component);
    }

    return;
}

export function registerInsert(store: Store, name_fn: ComponentFn | string, inserts: HComponentInsert[]): void {
    const component_name = typeof name_fn === "string" ? name_fn : name_fn.designator;

    const component = store.components.get(component_name);
    if (component === undefined) {
        store.components.set(component_name, {
            component_name,
            style: [],
            attachment: { assets: [], inserts, fonts: [] },
        });
    } else {
        const new_component: HComponent = {
            component_name: component_name,
            style: component.style,
            attachment: {
                script: component.attachment.script,
                assets: component.attachment.assets,
                inserts: [...component.attachment.inserts, ...inserts],
                fonts: component.attachment.fonts,
            },
        };
        store.components.set(component_name, new_component);
    }

    return;
}

export function registerFont(store: Store, name_fn: ComponentFn | string, fonts: HIconFontCharacter[]): void {
    const component_name = typeof name_fn === "string" ? name_fn : name_fn.designator;

    const component = store.components.get(component_name);
    if (component === undefined) {
        store.components.set(component_name, {
            component_name,
            style: [],
            attachment: { assets: [], inserts: [], fonts },
        });
    } else {
        const new_component: HComponent = {
            component_name: component_name,
            style: component.style,
            attachment: {
                script: component.attachment.script,
                assets: component.attachment.assets,
                inserts: component.attachment.inserts,
                fonts: [...component.attachment.fonts, ...fonts],
            },
        };
        store.components.set(component_name, new_component);
    }

    return;
}

export function registerRootPage(
    store: Store,
    raw_style: (StyleRule | StyleRule[])[],
    attachment?: HComponentAttachment,
): void {
    const component_name = "qrill-root-page";
    const style = raw_style.flatMap((x) => (Array.isArray(x) ? x : [x]));

    store.components.set(component_name, {
        component_name,
        style,
        attachment: attachment || { assets: [], inserts: [], fonts: [] },
    });
}

export function name_with_one_time_hash(store: Store, name: string): string {
    const count = store.element_count++;
    return `${name}-${hash_djb2(`${count.toString(16)}-${name}`).toString(16)}`;
}
