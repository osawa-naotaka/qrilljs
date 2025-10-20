import type { ClientFn, ComponentFn, PropBase, QNode, Store } from "qrilljs/core";
import {
    colorof,
    component,
    createDom,
    element,
    F_SMALL,
    F_TINY,
    faSvgIconFont,
    registerScript,
    registerStyle,
    S_2XLARGE,
    S_LARGE,
    S_MEDIUM,
    style,
    W_MEDIUM,
} from "qrilljs/core";
import type { SearchResult } from "staticseek";
import { createSearchFn, StaticSeekError } from "staticseek";
import * as v from "valibot";
import { postFmSchema } from "../../site.config.ts";
import { TAG_DESIGN } from "../../styles/design.ts";
import { dateTime } from "../element/dateTime.tsx";
import { tag } from "../element/tag.tsx";

export function search(store: Store): ComponentFn<PropBase> {
    const Search = element(store, { name: "search" });
    const SearchBar = element(store);
    const Input = element(store, { tag: "input", name: "search-input" });
    const InputIcon = faSvgIconFont(store, { type: "solid", name: "magnifying-glass" });
    const Result = element(store, { tag: "ul", name: "search-result" });

    const component_sytles = [
        style(Search)({
            max_width: W_MEDIUM(store),
            width: "100%",
            padding_inline: S_MEDIUM(store),
            margin_inline: "auto",
        }),
        style(SearchBar)({
            display: "flex",
            flex_direction: "row",
            align_items: "center",
            gap: "0.5rem",
            border_bottom: "2px solid",
        }),
        style(Input)({
            color: colorof(store, "text"),
            background_color: colorof(store, "background"),
            width: "100%",
            height: S_2XLARGE(store),
        }),
        style([Input, "::placeholder"])({ opacity: "0.5" }),
        style(Result)({ margin_block: S_LARGE(store), list_style_type: "none" }),
    ];

    registerStyle(store, Search, component_sytles);
    registerScript(store, Search, import.meta.url);

    return component(Search, () => (
        <Search>
            <SearchBar>
                <Input type="search" placeholder="SEARCH KEYWORDS" />
                <InputIcon />
            </SearchBar>
            <Result />
        </Search>
    ));
}

export default function clientFunction(store: Store): ClientFn {
    const SearchResultItem = searchResultItem(store);

    return async (root: Element) => {
        const search_fn = createSearchFn("/search-index.json");
        const search_result_e = querySelector<HTMLUListElement>(".search-result", root);
        const search_input_e = querySelector<HTMLInputElement>(".search-input", root);

        search_input_e.addEventListener("input", async () => {
            const results = await search_fn(search_input_e.value);
            if (results instanceof StaticSeekError) {
                setChild(search_result_e, [<li key="0">{`search function internal errror: ${results}`}</li>]);
            } else {
                setChild(
                    search_result_e,
                    results.map((result) => SearchResultItem({ result })),
                );
            }
        });
    };
}

function querySelector<T extends Element>(selector: string, d: Document | Element = document): T {
    const e = d.querySelector<T>(selector);
    if (e === null) {
        throw new Error(`element not found: ${selector}`);
    }
    return e;
}

function setChild(element: HTMLElement, nodes: QNode[]): void {
    element.innerText = "";
    for (const node of nodes) {
        for (const n of createDom(node)) {
            element.appendChild(n);
        }
    }
}

export const SearchKeySchema = v.object({
    slug: v.string(),
    data: postFmSchema,
});

type SearchResultItemAttribute = {
    result: SearchResult;
};

export function searchResultItem(store: Store): ComponentFn<SearchResultItemAttribute> {
    const ResultItem = element(store, { tag: "li", name: "search-result-item" });
    const Meta = element(store);
    const Title = element(store);
    const Description = element(store);
    const DateTime = dateTime(store);
    const Tag = tag(store);

    const component_styles = [
        style(ResultItem)({ margin_block: [S_2XLARGE(store), "0"] }),
        style(Meta)({
            display: "flex",
            flex_direction: "row",
            align_items: "center",
            gap: ["2px", "0.5rem"],
            flex_wrap: "wrap",
            font_size: F_SMALL(store),
            border_bottom: "1px solid",
        }),
        style(Description)({ font_size: F_TINY(store) }),
        TAG_DESIGN(store, "text", Tag),
    ];

    registerStyle(store, ResultItem, component_styles);

    return component(ResultItem, ({ result }) => {
        const key = v.parse(SearchKeySchema, result.key);
        return (
            <ResultItem>
                <Meta>
                    <div>{key.data.author}</div>
                    <DateTime datetime={key.data.date} />
                    {(key.data.tag || []).map((x) => (
                        <Tag slug={x} key={x} />
                    ))}
                </Meta>
                <Title>
                    <a href={`/posts/${key.slug}`}>{key.data.title}</a>
                </Title>
                <Description>{result.refs[0].wordaround || ""}</Description>
            </ResultItem>
        );
    });
}
