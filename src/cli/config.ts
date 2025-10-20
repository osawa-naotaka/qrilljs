import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { cwd } from "node:process";
import { cloneAndMergeRecord } from "../lib/core/util.ts";

export type AssetConfig = {
    target_prefix: string;
};

export type QrillConfig = {
    server: {
        hostname: string;
        port: number;
        watch_dir: string;
    };
    input: {
        page_dir: string;
        public_dir: string;
        site_conf: string;
    };
    output: {
        clean_befor_build: boolean;
        dist_dir: string;
    };
    asset: AssetConfig;
};

export const default_config: QrillConfig = {
    server: {
        hostname: "localhost",
        port: 4132,
        watch_dir: "site",
    },
    input: {
        page_dir: "site/pages",
        public_dir: "site/public",
        site_conf: "site/site.config.ts",
    },
    output: {
        clean_befor_build: true,
        dist_dir: "dist",
    },
    asset: {
        target_prefix: "/assets",
    },
};

export function loadConfig<T extends Record<string, string | number | symbol | unknown>>(
    relative_path: string,
    default_conf: T,
): T {
    const require = createRequire(import.meta.url);
    return requireConfig(require, relative_path, default_conf);
}

export function requireConfig<T extends Record<string, string | number | symbol | unknown>>(
    require: NodeJS.Require,
    relative_path: string,
    default_conf: T,
): T {
    const abs_path = path.join(cwd(), relative_path);
    if (!existsSync(abs_path)) {
        if (relative_path !== undefined) {
            console.warn(`qrill: config file "${abs_path}" is not found. use default value.`);
        }
        return default_conf;
    }

    try {
        const config = require(abs_path);
        if (typeof config.default !== "object") {
            console.warn(`qrill: config file "${abs_path}" has no default export. use default configuration.`);
            return default_conf;
        }
        return cloneAndMergeRecord(default_conf, config.default);
    } catch (_e) {
        console.warn(`qrill: fail to read config file "${abs_path}". use default.`);
        return default_conf;
    }
}
