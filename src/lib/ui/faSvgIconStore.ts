import type { Attribute, HComponentFn } from "@/lib/core/component";
import type { Store } from "@/lib/core/store";
import { hash_djb2_object } from "@/lib/core/util";
import { faSvgIconFont } from "@/lib/ui/faSvgIconFont";
import type { HSvgIconArg } from "@/lib/ui/faSvgIconFont";

export function faSvgIconStore(store: Store, icons: HSvgIconArg[]): HComponentFn<HSvgIconArg> {
    const icon_map = new Map<number, HComponentFn<Attribute>>();
    for (const icon of icons) {
        icon_map.set(hash_djb2_object(icon), faSvgIconFont(store, icon));
    }

    return (icon) => {
        const icon_fn = icon_map.get(hash_djb2_object(icon));
        if (icon_fn !== undefined) {
            return icon_fn({});
        }
        return "";
    };
}
