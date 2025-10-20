#!/usr/bin/env sh

if command -v deno >/dev/null 2>&1; then
    exec deno eval 'import { main } from "qrilljs/bin"; await main(process.argv.slice(2));' "$@" 
elif command -v tsx >/dev/null 2>&1; then
    exec node --import=tsx --eval 'import { main } from "qrilljs/bin"; await main(process.argv.slice(1));' "$@"
elif command -v bun >/dev/null 2>&1; then
    exec bun -e='import { main } from "qrilljs/bin"; await main(process.argv.slice(1));' "$@"
else
    echo "Error: Neither bun, tsx, is installed" >&2
    exit 1
fi
