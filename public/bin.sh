#!/usr/bin/env sh

runtime=""
script_args=()

# 引数をループして実行環境とその他の引数を分離
for arg in "$@"; do
    case "$arg" in
        --bun)
            runtime="bun"
            ;;
        --node)
            runtime="node"
            ;;
        --deno)
            runtime="deno"
            ;;
        *)
            script_args+=("$arg")
            ;;
    esac
done

# 実行環境が指定されていない場合、自動検出
if [ -z "$runtime" ]; then
    echo "No runtime specified. Auto-detecting..."
    
    # 優先順位: bun -> node -> deno
    if command -v bun &> /dev/null; then
        runtime="bun"
        echo "Found: Bun"
    elif command -v node &> /dev/null; then
        runtime="node"
        echo "Found: Node.js"
    elif command -v deno &> /dev/null; then
        runtime="deno"
        echo "Found: Deno"
    else
        echo "Error: No JavaScript runtime found (bun, node, or deno)"
        exit 1
    fi
fi

case "$runtime" in
    bun)
        echo "Running with Bun..."
        exec bun -e='import { main } from "qrilljs/bin"; await main(process.argv.slice(1));' "${script_args[@]}"
        ;;
    node)
        echo "Running with Node.js..."
        exec node --import=tsx --eval 'import { main } from "qrilljs/bin"; await main(process.argv.slice(1));' "${script_args[@]}"
        ;;
    deno)
        echo "Running with Deno..."
        exec deno eval 'import { main } from "qrilljs/bin"; await main(process.argv.slice(2));' "${script_args[@]}"
        ;;
esac

