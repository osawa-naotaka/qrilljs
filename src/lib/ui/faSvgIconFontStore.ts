import { type ComponentFn, component } from "../core/component.ts";
import { name_with_one_time_hash, type Store } from "../core/store.ts";
import { hash_djb2_object } from "../core/util.ts";
import type { FAIcon } from "./faIcon.ts";
import { faSvgIconFont } from "./faSvgIconFont.ts";

export function faSvgIconFontStore(store: Store, icons: FAIcon[]): ComponentFn<FAIcon> {
    const icon_map = new Map<number, ComponentFn>();
    for (const icon of icons) {
        icon_map.set(hash_djb2_object(icon), faSvgIconFont(store, icon));
    }

    return component(name_with_one_time_hash(store, "fa-svg-icon-store"), (icon) => {
        const icon_fn = icon_map.get(hash_djb2_object(icon));
        if (icon_fn !== undefined) {
            return icon_fn({});
        }
        return "";
    });
}
