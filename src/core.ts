export * from "@/lib/core/component";
export * from "@/lib/core/design";
export * from "@/lib/core/dom";
export * from "@/lib/core/element";
export * from "@/lib/core/markdown";
export * from "@/lib/core/properties";
export * from "@/lib/core/store";
export * from "@/lib/core/style";
export * from "@/lib/core/stylerules";
export * from "@/lib/core/util";
export * from "@/lib/ui/faIcon";
export * from "@/lib/ui/faSvgIconFont";
export * from "@/lib/ui/faSvgIconStore";

import type { QrillConfig } from "@/cli/config";
import type { DesignRule } from "@/lib/core/design";
import type { RecursivePartial } from "@/lib/core/util";

export function defaultConfig(conf: RecursivePartial<QrillConfig>): RecursivePartial<QrillConfig> {
    return conf;
}

export function defaultSiteConfig(conf: RecursivePartial<DesignRule>): RecursivePartial<DesignRule> {
    return conf;
}
