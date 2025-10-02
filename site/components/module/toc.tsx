import { type HComponentFn, type Store, component, element } from "@/core";
import type { ToC } from "remark-assign-id-and-extract-toc";

export type ToCArgument = {
    toc: ToC[];
};

export function toc(store: Store): HComponentFn<ToCArgument> {
    const ToC = element(store, "ul");
    const Item = element(store, "li");

    return component(ToC, ({ toc }) => (
        <ToC>
            {toc.map((x) => (
                <Item key={x.id}>
                    <a href={`#${x.id}`}>{x.text}</a>
                </Item>
            ))}
        </ToC>
    ));
}
