import type { Child, PropBase, QNode } from "@/lib/core/component";
import { sanitizeAttributeValue, sanitizeBasic, validateAttributeKey, validateElementName } from "@/lib/core/sanityze";

// DOM Builder
export function createDom(node: QNode, d: Document = document): Node[] {
    return createDomInternal(0, [], d)(node);
}

function createDomInternal(
    depth: number,
    additional_class: string | string[],
    d: Document = document,
): (child: Child) => Node[] {
    return (child: Child) => {
        if (depth > 64) {
            throw new Error("stringifyToHtml: html element nesting depth must be under 64.");
        }

        if (child === null || child === undefined || child === false) {
            return [];
        }

        if (Array.isArray(child)) {
            return child.flatMap(createDomInternal(depth, additional_class, d));
        }

        // child is QNode
        if (typeof child === "string") {
            return [d.createTextNode(sanitizeBasic(child))];
        }

        // child is QElement
        const props_children = Array.isArray(child.props.children) ? child.props.children : [child.props.children];
        child.props.children = undefined;

        if (child.tag === "raw") {
            throw new Error("Raw node must not be used in client module.");
        }

        if (!validateElementName(child.tag)) {
            throw new Error(`createDom: invalid element name ${child.tag}.`);
        }

        if (child.tag === "unwrap") {
            return props_children.flatMap(createDomInternal(depth + 1, additional_class, d));
        }

        if (child.tag === "class") {
            return props_children.flatMap(createDomInternal(depth + 1, child.props.class || [], d));
        }

        const element = d.createElement(child.tag);
        setAttribute(element, child.props);
        const classes = typeof additional_class === "string" ? [additional_class] : additional_class;
        element.classList.add(...classes.map(sanitizeAttributeValue("class")));

        for (const c of props_children) {
            for (const child_element of createDomInternal(depth + 1, [], d)(c)) {
                element.appendChild(child_element);
            }
        }
        return [element];
    };
}

function setAttribute(element: HTMLElement, attribute: Partial<PropBase>): void {
    for (const [raw_key, value] of Object.entries(attribute)) {
        if (raw_key === "children") {
            continue;
        }

        const key = raw_key.replaceAll("_", "-");

        if (!validateAttributeKey(key)) {
            throw new Error(`attributeToString: invalid attribute key ${key}.`);
        }

        if (value === "" || value === null) {
            element.setAttribute(key, "");
            return;
        }

        if (typeof value !== "string" && !Array.isArray(value)) {
            throw new Error(
                `attributeToString: invalid attribute value type ${value}. only string value or array of string value is allowd.`,
            );
        }

        for (const v of Array.isArray(value) ? value : [value]) {
            element.setAttribute(key, sanitizeAttributeValue(key)(v));
        }
    }
}
