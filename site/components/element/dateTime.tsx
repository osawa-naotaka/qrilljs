import type { HComponentFn, Store } from "qrilljs/core";
import { component, element } from "qrilljs/core";

export type DateTimeArgument = {
    datetime: string | Date;
    lang?: string;
};

export function dateTime(store: Store): HComponentFn<DateTimeArgument> {
    const DateTime = element(store, { tag: "time", name: "date-time" });
    return component(DateTime, ({ datetime, lang = "en-us" }) => {
        const date = datetime instanceof Date ? datetime : new Date(datetime);
        const date_string = date.toLocaleDateString(lang, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

        return <DateTime datetime={date.toISOString()}>{date_string}</DateTime>;
    });
}
