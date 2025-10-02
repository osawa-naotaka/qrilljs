export * from "@/lib/core/component";
export * from "@/lib/core/util";
export * from "@/lib/core/design";
export * from "@/lib/core/dom";
export * from "@/lib/core/elements";
export * from "@/lib/core/properties";
export * from "@/lib/core/store";
export * from "@/lib/core/style";
export * from "@/lib/core/stylerules";
export * from "@/lib/core/markdown";
export * from "@/lib/ui/fa_icon";
export * from "@/lib/ui/svgIconFont";
export * from "@/lib/ui/svgIconStore";

import type { QrillConfig } from "@/cli/config";
import type { DesignRule } from "@/lib/core/design";
import type { RecursivePartial } from "@/lib/core/util";

export function defaultConfig(conf: RecursivePartial<QrillConfig>): RecursivePartial<QrillConfig> {
    return conf;
}

export function defaultSiteConfig(conf: RecursivePartial<DesignRule>): RecursivePartial<DesignRule> {
    return conf;
}
