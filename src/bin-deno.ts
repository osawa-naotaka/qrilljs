#!/usr/bin/env -S deno run -A --ext=ts

import { main } from "./bin";

await main(process.argv.slice(2));
