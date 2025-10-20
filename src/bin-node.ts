#!/usr/bin/env -S node --import=tsx

import { main } from "./bin";

console.log(process.argv);
await main(process.argv.slice(2));
