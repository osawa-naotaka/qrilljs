# Hello qrill: 最初のプロジェクト

このガイドでは、qrillを使って最初の"Hello World"プロジェクトを作成し、開発・ビルドする方法を説明します。

## プロジェクトの作成

### 1. プロジェクト構造

qrillプロジェクトは以下のような構造で作成します：

```
hello_qrill/
├── package.json
├── tsconfig.json
└── site/
    └── pages/
        └── index.html.tsx
```

### 2. package.json の設定

```json
{
    "name": "hello_qrill",
    "devDependencies": {
        "@biomejs/biome": "^1.9.4",
        "@types/node": "^22.13.10",
        "tsx": "^4.19.3",
        "typescript": "^5.8.2"
    },
    "packageManager": "yarn@4.7.0",
    "scripts": {
        "build": "tsc && qrill build",
        "dev": "tsc --watch & qrill dev",
        "check": "biome check --write ./site"
    },
    "dependencies": {
        "qrill": "../../../qrill-0.1.0-alpha.3.tgz"
    }
}
```

### 3. TypeScript設定（tsconfig.json）

```json
{
    "compilerOptions": {
        "target": "ES2024",
        "useDefineForClassFields": true,
        "module": "ESNext",
        "lib": ["ES2024", "DOM", "DOM.Iterable"],
        "skipLibCheck": true,

        // JSX
        "jsx": "react-jsx",
        "jsxImportSource": "qrill",

        /* Bundler mode */
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": false,
        "isolatedModules": true,
        "moduleDetection": "force",
        "noEmit": true,

        /* Linting */
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true,
        "noUncheckedSideEffectImports": true,

        // config for VSCode
        "paths": {
            "@site/*": ["./site/*"]
        }
    },
    "include": ["./site/**/*"]
}
```

### 4. 最初のページ（site/pages/index.html.tsx）

```tsx
import type { HRootPageFn, Store } from "qrill/core";

export default function Root(_store: Store): HRootPageFn<void> {
    return async () => (
        <html lang="en">
            <head>
                <title>Hello, qrill!</title>
            </head>
            <body>
                <h1>Hello, qrill!</h1>
            </body>
        </html>
    );
}
```

## 開発方法

### 開発サーバーの起動

```bash
npm run dev
```

このコマンドは以下を実行します：
- `tsc --watch`: TypeScriptファイルの変更を監視してコンパイル
- `qrill dev`: 開発サーバーを起動

開発サーバーが起動すると、ファイルの変更を監視し、自動でブラウザに反映されます。

## ビルド方法

### プロダクション用ビルド

```bash
npm run build
```

このコマンドは以下を実行します：
1. `tsc`: TypeScriptファイルをコンパイル
2. `qrill build`: 静的サイトを生成

ビルドが完了すると、`dist/`ディレクトリに静的ファイルが生成されます。

## コードチェック

コードの品質を確認するには：

```bash
npm run check
```

このコマンドは[Biome](https://biomejs.dev/)を使用してコードのフォーマットとリントを実行します。

## 重要なポイント

- **JSX設定**: `jsxImportSource`を`"qrill"`に設定することで、qrillのJSX機能を使用できます
- **ページファイル**: `site/pages/`ディレクトリ内の`.tsx`ファイルがルーティングに使用されます
- **型安全性**: TypeScriptの厳格な設定により、型安全なコードが書けます
- **開発体験**: ホットリロード機能により、変更がリアルタイムで反映されます
