#!/usr/bin/env -S bun

import { main } from "./bin";

await main(process.argv.slice(2));
