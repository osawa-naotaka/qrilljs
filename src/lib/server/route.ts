import { PageFn } from "../../lib/core/component";

export type Ext = ".html" | ".css" | ".js" | ".woff2" | ".json";

export type PageRoute<T> = {
    path: string;
    shared_path?: string;
    ext: Ext;
    pageFn: PageFn<T>;
    param?: T;
    isGen: boolean;
};

export function sharedPage<T>(shared_path: string, pathFn: (param: T) => string, page: PageFn<T>, params: T[]): Record<string, PageRoute<T>> {
    const pageRecord: Record<string, PageRoute<T>> = {
        [`${shared_path}.css`]: {
            path: shared_path,
            ext: ".css",
            pageFn: page,
            isGen: true,
        },
        [`${shared_path}.js`]: {
            path: shared_path,
            ext: ".js",
            pageFn: page,
            isGen: true,
        },
        [`${shared_path}.woff2`]: {
            path: shared_path,
            ext: ".woff2",
            pageFn: page,
            isGen: true,
        },
    };

    for (const param of params) {
        const path = pathFn(param);
        pageRecord[`${path}.html`] = {
            path,
            shared_path,
            ext: ".html",
            pageFn: page,
            param,
            isGen: true,
        };
        pageRecord[`${path}`] = {
            path,
            shared_path,
            ext: ".html",
            pageFn: page,
            param,
            isGen: false,
        };    }

    return pageRecord;
}

export function file<T>(path: string, ext: Ext, page: PageFn<T>): Record<string, PageRoute<T>> {
    return {
        [path]: {
            path,
            ext,
            pageFn: page,
            isGen: true,
        },
    }
}

export function indexPage<T>(path: string, page: PageFn<T>): Record<string, PageRoute<T>> {
    const base = path.endsWith("/") ? path : `${path}/`;
    const baseWoSlash = base.substring(0, base.length - 1);
    const indexPath = `${base}index`;
 
    return {
        [base]: {
            path: indexPath,
            ext: ".html",
            pageFn: page,
            isGen: false,
        },
        [baseWoSlash]: {
            path: indexPath,
            ext: ".html",
            pageFn: page,
            isGen: false,
        },
        [`${base}index.html`]: {
            path: indexPath,
            ext: ".html",
            pageFn: page,
            isGen: true,
        },
        [`${base}index.css`]: {
            path: indexPath,
            ext: ".css",
            pageFn: page,
            isGen: true,
        },
        [`${base}index.js`]: {
            path: indexPath,
            ext: ".js",
            pageFn: page,
            isGen: true,
        },
        [`${base}index.woff2`]: {
            path: indexPath,
            ext: ".woff2",
            pageFn: page,
            isGen: true,
        },
    };
}


export function defineRoute(routes: Record<string, PageRoute<any>>[]): Record<string, PageRoute<any>>[] {
    return routes;
}
