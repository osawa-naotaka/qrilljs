import { dateTime } from "@site/components/element/dateTime";
import { tag } from "@site/components/element/tag";
import { postFmSchema } from "@site/site.config";
import { TAG_DESIGN } from "@site/styles/design";
import { as, colorof, component, createDom, element, hSvgIconFont, registerComponent, style } from "qrill/core";
import { DEFAULT_RESPONSIVE_PAGE_WIDTH, F_SMALL, F_TINY, S_2XLARGE, S_LARGE } from "qrill/core";
import type { HArgument, HClientFn, HComponentFn, HNode, Store } from "qrill/core";
import type { SearchResult } from "staticseek";
import * as v from "valibot";

import { StaticSeekError, createSearchFn } from "staticseek";

export function search(store: Store): HComponentFn<HArgument> {
    const Search = element("search");
    const SearchBar = element("search-bar");
    const Input = element("search-input", { tag: "input" });
    const InputIcon = hSvgIconFont(store, { type: "solid", name: "magnifying-glass" });
    const Result = element("search-result", { tag: "ul" });
    searchResultItem(store);

    const component_sytles = [
        style(Search)(DEFAULT_RESPONSIVE_PAGE_WIDTH(store)),
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
            height: S_2XLARGE(store),
        }),
        style([Input, "::placeholder"])({ opacity: "0.5" }),
        style(Result)({ margin_block: S_LARGE(store) }),
    ];

    registerComponent(store, Search, component_sytles, { script: import.meta.url });

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

export default function clientFunction(store: Store): HClientFn {
    const SearchResultItem = searchResultItem(store);

    return async () => {
        const search_fn = createSearchFn("/search-index.json");
        const search_result_e = querySelector<HTMLUListElement>(".search-result");
        const search_input_e = querySelector<HTMLInputElement>(".search-input");

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

function querySelector<T extends Element>(selector: string, d: Document = document): T {
    const e = d.querySelector<T>(selector);
    if (e === null) {
        throw new Error(`element not found: ${selector}`);
    }
    return e;
}

function setChild(element: HTMLElement, nodes: HNode[]): void {
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

export function searchResultItem(store: Store): HComponentFn<SearchResultItemAttribute> {
    const ResultItem = element("search-result-item", { tag: "li" });
    const Meta = element("search-result-item-meta");
    const Title = element("search-result-item-title");
    const Description = element("search-result-item-description");
    const DateTime = dateTime();
    const Tag = as("serch-result-item-tag", tag());

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

    registerComponent(store, ResultItem, component_styles);

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
