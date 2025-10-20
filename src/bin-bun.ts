#!/usr/bin/env -S bun

import { main } from "./bin";

console.log(process.argv);
await main(process.argv.slice(2));
