import { defineRoute, indexPage, listFiles, file, sharedPage } from "qrilljs/server";
import Home from "./pages/index.html";
import Posts from "./pages/posts/index.html";
import Post from "./pages/posts/[slug].html";
import Tag from "./pages/tags/[tag].html";
import createSearchIndex from "./pages/search-index.json";
import { basename } from "node:path";
import { tag_map } from "./site.config";

export default defineRoute([
    indexPage("/", Home),
    indexPage("/posts", Posts),
    sharedPage("/posts/id", (p: { slug: string }) => `/posts/${p.slug}`, Post, listFiles(`/site/contents/posts`, ".md").map((x) => ({ slug: basename(x, ".md") }))),
    sharedPage("/tags/id", (p: { tag: string }) => `/tags/${p.tag}`, Tag, Object.keys(tag_map).map((tag) => ({ tag }))),
    file("/search-index.json", ".json", createSearchIndex),
]);
