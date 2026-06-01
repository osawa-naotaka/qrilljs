import { getAllMarkdowns } from "qrilljs/server";
import { createIndex, indexToObject, LinearIndex, StaticSeekError } from "staticseek";
import type { RootNodeFn } from "@/core.ts";
import { postFmSchema, posts_dir } from "../site.config.ts";

export function createSearchIndex(): RootNodeFn<void> {
    return async () => {
        const posts = await getAllMarkdowns(posts_dir, postFmSchema);
        const index = createIndex(LinearIndex, posts, {
            key_fields: ["slug", "data"],
            search_targets: ["data.title", "content"],
        });
        if (index instanceof StaticSeekError) throw index;
        return JSON.stringify(indexToObject(index));
    };
}
