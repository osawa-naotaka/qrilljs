import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import type { Child, PropBase, QNode } from "../lib/core/component.ts";
import { DOCTYPE, void_tags } from "../lib/core/element.ts";
import {
    sanitizeAttributeValue,
    sanitizeBasic,
    validateAttributeKey,
    validateElementName,
} from "../lib/core/sanityze.ts";
import type { HComponentInsert, Store } from "../lib/core/store.ts";
import { addClassInRecord, deepFlatMap } from "../lib/core/util.ts";
import { insertNodes } from "../lib/server/inserter.ts";

export function bundleHtml(store: Store, top_node: QNode, insert_nodes: QNode[]): string {
    const attached = insertAttachmentNode(store, top_node);

    const all_processed = insertNodes(attached, ["head"], insert_nodes, true);

    return DOCTYPE() + stringifyToHtml(0, [])(all_processed);
}

function insertAttachmentNode(store: Store, top_node: QNode) {
    const insert_nodes: [string, HComponentInsert[]][] = [];
    for (const [key, value] of store.components.entries()) {
        if (value.attachment?.inserts !== undefined) {
            insert_nodes.push([key, value.attachment.inserts]);
        }
    }

    return insert_nodes.reduce(
        (p, c) => c[1].reduce((pp, cc) => insertNodes(pp, cc.selector, cc.nodes, true), p),
        top_node,
    );
}

// Node To HTML
export function stringifyToHtml(depth: number, additional_class: string | string[]): (node: Child) => string {
    return (node: Child) => {
        if (depth > 64) {
            throw new Error("stringifyToHtml: html element nesting depth must be under 64.");
        }

        if (node === null || node === undefined || typeof node === "boolean") {
            return "";
        }

        if (typeof node === "string") {
            return sanitizeBasic(node);
        }

        const children = Array.isArray(node.props.children) ? node.props.children : [node.props.children];
        node.props.children = undefined;

        if (node.tag === "raw") {
            const window = new JSDOM("").window;
            const purify = DOMPurify(window);
            return deepFlatMap((x) => {
                if (typeof x !== "string") {
                    throw new Error(`Raw node must be string at '${node}'.`);
                }
                return purify.sanitize(x);
            }, children).join("");
        }

        if (!validateElementName(node.tag)) {
            throw new Error(`stringifyToHtml: invalid element name ${node.tag}.`);
        }

        if (node.tag === "fragment") {
            return deepFlatMap(stringifyToHtml(depth + 1, additional_class), children).join("");
        }

        if (node.tag === "class") {
            return deepFlatMap(stringifyToHtml(depth + 1, node.props.class || []), children).join("");
        }

        const attribute = additional_class.length === 0 ? node.props : addClassInRecord(node.props, additional_class);
        const c = deepFlatMap(stringifyToHtml(depth + 1, []), children).join("");
        if (void_tags.filter((x) => x === node.tag).length !== 0) {
            if (c.length !== 0) {
                throw new Error(`stringifyToHtml: element ${node.tag} must be a void element, but has "${c}".`);
            }
            return `<${node.tag}${attributeToString(attribute)}>`;
        }
        return `<${node.tag}${attributeToString(attribute)}>${c}</${node.tag}>`;
    };
}

function attributeToString(attribute: Partial<PropBase>): string {
    return Object.entries(attribute)
        .map(([raw_key, value]) => {
            if (raw_key === "children") {
                return "";
            }

            const key = raw_key.replaceAll("_", "-");

            if (!validateAttributeKey(key)) {
                throw new Error(`attributeToString: invalid attribute key ${key}.`);
            }

            if (key.length > 64) {
                throw new Error(`attributeToString: key length must be under 64 characters. (${key})`);
            }

            if (value === "" || value === null) {
                return ` ${key}`;
            }

            if (typeof value !== "string" && !Array.isArray(value)) {
                throw new Error(
                    `attributeToString: invalid attribute value type ${value}. only string value or array of string value is allowd.`,
                );
            }

            const sanitized = Array.isArray(value)
                ? value.map(sanitizeAttributeValue(key))
                : [sanitizeAttributeValue(key)(value)];

            return ` ${key}="${sanitized.join(" ")}"`;
        })
        .join("");
}
