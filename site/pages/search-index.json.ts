import { getAllMarkdowns } from "qrilljs/server";
import { createIndex, indexToObject, LinearIndex, StaticSeekError } from "staticseek";
import { postFmSchema, posts_dir } from "../site.config.ts";
import { RootPageFn } from "@/core.ts";

export default function createSearchIndex(): RootPageFn<void> {
    return async () => {
        const posts = await getAllMarkdowns(posts_dir, postFmSchema);
        const index = createIndex(LinearIndex, posts, {
            key_fields: ["slug", "data"],
            search_targets: ["data.title", "content"],
        });
        if (index instanceof StaticSeekError) throw index;
        return JSON.stringify(indexToObject(index));        
    }
}
