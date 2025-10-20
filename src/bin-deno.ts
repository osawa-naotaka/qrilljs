#!/usr/bin/env -S deno run -A --ext=ts

import { main } from "./bin";

console.log(process.argv);
await main(process.argv.slice(2));
