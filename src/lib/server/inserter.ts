import type { Child, PropBase, QElement, QNode } from "../core/component";
import type { CompoundSelector, Selector } from "../core/style.ts";
import { isCombinator, normalizeSelector } from "../core/style.ts";

// Inserter (QNode).
export function insertNodes(root: QNode, selector: Selector[], insert: QNode[], search_deep: boolean): QNode {
    return insertNodesInternal(root, selector, insert, search_deep);
}

export function insertNodesInternal(root: Child, selector: Selector[], insert: QNode[], search_deep: boolean): QNode {
    if (typeof root === "string") {
        return root;
    }

    if (root === undefined || root === null || typeof root === "boolean") {
        return "";
    }

    if (selector.length === 0) {
        return root;
    }

    if (isCombinator(selector[0])) {
        switch (selector[0]) {
            case ">":
                return insertNodesInternal(root, selector.slice(1), insert, false);
            default:
                throw new Error("insertElementsCombinator: unsupported combinator.");
        }
    }

    if (root.props === undefined) {
        root.props = {};
    }
    const children = Array.isArray(root.props.children) ? root.props.children : [root.props.children];

    if (matchCompoundSelector(normalizeSelector(selector[0]), root)) {
        const child =
            selector.length === 1
                ? [...children, ...insert]
                : children.map((c) => insertNodesInternal(c, selector.slice(1), insert, true));
        root.props.children = child;
        return root;
    }

    if (search_deep) {
        const new_child = children.map((c) => insertNodesInternal(c, selector, insert, true));
        root.props.children = new_child;
    }
    return root;
}

function matchCompoundSelector(selector: CompoundSelector, element: QElement<{ id?: string }>): boolean {
    for (const s of selector) {
        if (typeof s !== "string") {
            throw new Error("matchCompoundSelector: ComponentFn is not supported.");
        }
        if (s.startsWith(".")) {
            if (!hasClass(s.slice(1), element.props)) {
                return false;
            }
        } else if (s.startsWith("#")) {
            if (element.props.id === undefined || element.props.id !== s.slice(1)) {
                return false;
            }
        } else if (s !== "*") {
            if (element.tag !== s) {
                return false;
            }
        }
    }
    return true;
}

function hasClass(className: string, attribute: PropBase): boolean {
    if (attribute.class === undefined || typeof attribute.class !== "string") {
        return false;
    }
    return attribute.class.includes(className);
}
