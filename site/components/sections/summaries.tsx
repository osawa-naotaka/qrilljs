import { summary } from "@site/components/module/summary";
import type { PostFm } from "@site/site.config";
import { component, element } from "qrilljs/core";
import type { HComponentFn, Markdown, Store } from "qrilljs/core";

export type SummariesArgument = {
    posts: Markdown<PostFm>[];
};

export function summaries(store: Store): HComponentFn<SummariesArgument> {
    const Summaries = element(store, { tag: "section" }, "summaries");
    const Summary = summary(store);

    return component(Summaries, ({ posts }) => (
        <Summaries>
            {posts.map((post) => (
                <Summary slug={post.slug} data={post.data} content={post.content} key={post.slug} />
            ))}
        </Summaries>
    ));
}
