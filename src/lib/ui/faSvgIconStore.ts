import { type ComponentFn, component } from "@/lib/core/component";
import { name_with_one_time_hash, type Store } from "@/lib/core/store";
import { hash_djb2_object } from "@/lib/core/util";
import type { HSvgIconArg } from "@/lib/ui/faSvgIconFont";
import { faSvgIconFont } from "@/lib/ui/faSvgIconFont";

export function faSvgIconStore(store: Store, icons: HSvgIconArg[]): ComponentFn<HSvgIconArg> {
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
