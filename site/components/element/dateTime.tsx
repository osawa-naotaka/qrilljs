import { component, element } from "qrill/core";
import type { HComponentFn, Store } from "qrill/core";

export type DateTimeArgument = {
    datetime: string | Date;
    lang?: string;
};

export function dateTime(store: Store): HComponentFn<DateTimeArgument> {
    const DateTime = element(store, "date-time", { tag: "time" });
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
