import type { ComponentFn } from "../core/component.ts";
import { component, element } from "../core/component.ts";
import type { Store } from "../core/store.ts";
import { registerFont } from "../core/store.ts";
import type { FAIcon } from "./faIcon.ts";

export function faSvgIconFont(store: Store, arg: FAIcon): ComponentFn {
    const font_name = `${arg.type}-${arg.name}`;
    const Top = element(store, {
        tag: "i",
        name: `svg-icon-font-${arg.type}-${arg.name}`,
        class: ["hf", `hf-${font_name}`],
    });

    registerFont(store, Top, [
        {
            package_name: "@fortawesome/fontawesome-free",
            chars: [
                {
                    src: `svgs/${arg.type}/${arg.name}.svg`,
                    name: font_name,
                },
            ],
        },
    ]);

    return component(Top, Top);
}
