import { basename } from "node:path";
import { defineRoute, file, indexPage, listFiles, sharedPage } from "qrilljs/server";
import { HomePage } from "./pages/HomePage";
import { PostPage } from "./pages/PostPage";
import { PostsPage } from "./pages/PostsPage";
import { createSearchIndex } from "./pages/SearchIndex";
import { TagPage } from "./pages/TagPage";
import { tag_map } from "./site.config";

export default defineRoute([
    indexPage("/", HomePage),
    indexPage("/posts", PostsPage),
    sharedPage(
        "/posts/id",
        ({ slug }) => `/posts/${slug}`,
        PostPage,
        listFiles(`/site/contents/posts`, ".md").map((x) => ({ slug: basename(x, ".md") })),
    ),
    sharedPage(
        "/tags/id",
        ({ tag }) => `/tags/${tag}`,
        TagPage,
        Object.keys(tag_map).map((tag) => ({ tag })),
    ),
    file("/search-index.json", ".json", createSearchIndex),
]);
