import type { ComponentFn, Markdown, Store } from "qrilljs/core";
import { component, element } from "qrilljs/core";
import type { PostFm } from "../../site.config.ts";
import { summary } from "../module/summary.tsx";

export type SummariesArgument = {
    posts: Markdown<PostFm>[];
};

export function summaries(store: Store): ComponentFn<SummariesArgument> {
    const Summaries = element(store, { tag: "section", name: "summaries" });
    const Summary = summary(store);

    return component(Summaries, ({ posts }) => (
        <Summaries>
            {posts.map((post) => (
                <Summary slug={post.slug} data={post.data} content={post.content} key={post.slug} />
            ))}
        </Summaries>
    ));
}
