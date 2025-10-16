import type { ToC } from "remark-export-toc";
import { type ComponentFn, component, element, type Store } from "@/core";

export type ToCArgument = {
    toc: ToC[];
};

export function toc(store: Store): ComponentFn<ToCArgument> {
    const ToC = element(store, { tag: "ul" });
    const Item = element(store, { tag: "li" });

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
