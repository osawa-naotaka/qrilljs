export * from "./lib/core/component.ts";
export * from "./lib/core/design.ts";
export * from "./lib/core/dom.ts";
export * from "./lib/core/element.ts";
export * from "./lib/core/markdown.ts";
export * from "./lib/core/properties.ts";
export * from "./lib/core/store.ts";
export * from "./lib/core/style.ts";
export * from "./lib/core/stylerules.ts";
export * from "./lib/core/util.ts";
export * from "./lib/ui/faIcon.ts";
export * from "./lib/ui/faSvgIconFont.ts";
export * from "./lib/ui/faSvgIconStore.ts";

import type { QrillConfig } from "./cli/config.ts";
import type { DesignRule } from "./lib/core/design.ts";
import type { RecursivePartial } from "./lib/core/util.ts";

export function defaultConfig(conf: RecursivePartial<QrillConfig>): RecursivePartial<QrillConfig> {
    return conf;
}

export function defaultSiteConfig(conf: RecursivePartial<DesignRule>): RecursivePartial<DesignRule> {
    return conf;
}
