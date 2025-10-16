import { summary } from "@site/components/module/summary";
import type { PostFm } from "@site/site.config";
import type { ComponentFn, Markdown, Store } from "qrilljs/core";
import { component, element } from "qrilljs/core";

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
