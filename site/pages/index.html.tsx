import { component, ComponentFn, element, type RootPageFn, type Store } from "qrilljs/core";

export default function Root(store: Store): RootPageFn<void> {
    const H1 = element(store, { tag: "h1" });
    const Comp1 = comp1(store);

    return async () => {
        return (
            <html>
                <head>
                    <title>homepage</title>
                </head>
                <body>
                    <H1>Hello, Again!</H1>
                    <Comp1>
                        <div>hage</div>
                        <span>hige</span>
                    </Comp1>
                </body>
            </html>
        );
    };
}

function comp1(store: Store): ComponentFn {
    const H2 = element(store, { tag: "h2" });
    return component(H2, ({ children }) => {
        return (
            <H2>hoge{children}</H2>
        );
    })
}
