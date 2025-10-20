#!/usr/bin/env -S node --import=tsx

import { main } from "./bin";

await main(process.argv.slice(2));
