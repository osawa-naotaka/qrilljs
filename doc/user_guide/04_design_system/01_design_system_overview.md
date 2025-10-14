# qrillデザインシステム

qrillは型安全なCSS-in-JSアプローチによるデザインシステムを提供します。このガイドでは、デザインルールの設定、コンポーネントのスタイリング、そして一貫したデザインシステムの構築方法について説明します。

## デザインシステムの概要

qrillのデザインシステムは以下の要素で構成されています：

- **DesignRule**: サイト全体のデザイン規則を定義
- **Store**: アプリケーション全体でデザインルールにアクセス
- **StyleRule**: コンポーネント単位のスタイル定義
- **CSS生成**: TypeScript型チェック付きのCSS-in-JS

## DesignRuleの基本構造

### カラーシステム

```typescript
type ColorSet = {
    primary: ColorVariant;
    secondary: ColorVariant;
    thirdary: ColorVariant;
    forthary: ColorVariant;
    accent: ColorVariant;
    text: ColorVariant;
    text_secondary: ColorVariant;
    background: ColorVariant;
    background_secondary: ColorVariant;
    success: ColorVariant;
    error: ColorVariant;
    warning: ColorVariant;
    info: ColorVariant;
};

type ColorVariant = {
    main: [number, number, number];  // RGB値
    light: [number, number, number];
    dark: [number, number, number];
};
```

### サイズシステム

```typescript
type SizeRem = {
    tiny: string;     // 0.75rem
    small: string;    // 0.875rem
    medium: string;   // 1rem
    large: string;    // 1.125rem
    xlarge: string;   // 1.25rem
    x2large: string;  // 1.5rem
    x3large: string;  // 2rem
};

type SizeRule = {
    font: SizeRem;
    spacing: SizeRem;
    width: SizeRem;
};
```

### フォントシステム

```typescript
type FontRule = {
    family: string[];   // フォントファミリーの優先順位
    base_size: string;  // ベースフォントサイズ（通常18px）
    line_height: string; // 行間（通常1.8）
};
```

## デザインルールの設定

### サイト設定ファイル（site.config.ts）

```typescript
import { defaultSiteConfig } from "qrill/core";
import type { DesignRule } from "qrill/core";

export default defaultSiteConfig({
    color: {
        category: {
            primary: {
                main: [63, 81, 181],    // Material Blue
                light: [121, 134, 203],
                dark: [26, 35, 126],
            },
            secondary: {
                main: [76, 175, 80],    // Material Green
                light: [129, 199, 132],
                dark: [27, 94, 32],
            },
            accent: {
                main: [255, 64, 129],   // Material Pink
                light: [255, 128, 171],
                dark: [216, 27, 96],
            },
            background: {
                main: [240, 240, 240],  // Light Gray
                light: [250, 250, 250],
                dark: [200, 200, 200],
            },
        },
        brightness: {
            lightest: "60%",
            light: "80%",
            dark: "80%",
            darkest: "60%",
        }
    },
    size: {
        font: {
            tiny: "0.75rem",
            small: "0.875rem",
            medium: "1rem",
            large: "1.125rem",
            xlarge: "1.25rem",
            x2large: "1.5rem",
            x3large: "2rem",
        },
        spacing: {
            tiny: "0.25rem",
            small: "0.5rem",
            medium: "1rem",
            large: "1.25rem",
            xlarge: "1.5rem",
            x2large: "2rem",
            x3large: "4rem",
        }
    },
    font: {
        family: ['"Helvetica Neue"', "Arial", "sans-serif"],
        base_size: "18px",
        line_height: "1.8",
    }
});
```

## スタイルシステムの基本

### style()関数による基本的なスタイリング

```typescript
import { style, registerStyle } from "qrill/core";
import type { Store } from "qrill/core";

export function myButton(store: Store): ComponentFn<ButtonAttribute> {
    const Button = element("my-button"); // default tag is div
    
    registerStyle(store, Button, [
        style(Button)({
            padding: S_MEDIUM(store),
            font_size: F_MEDIUM(store),
            border_radius: "4px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
        }),
        
        style(Button, ":hover")({
            background_color: LIGHTER(store, "primary"),
        }),
    ]);
    
    return component(Button, (attr, ...childrenren) => (
        <Button {...attr}>{children}</Button>
    ));
}
```

### デザインヘルパー関数の活用

qrillは一貫したデザインを実現するためのヘルパー関数を提供します：

#### カラーヘルパー

```typescript
// 基本色の取得
const primaryColor = colorof(store, "primary", "main");
const primaryLight = colorof(store, "primary", "light");

// バリエーション色の生成
const darkerPrimary = DARKER(store, "primary");
const lighterPrimary = LIGHTER(store, "primary");

// カラーミックス
const mixedColor = MIX_WHITE(colorof(store, "primary"))("20%");
```

#### サイズヘルパー

```typescript
// フォントサイズ
font_size: F_LARGE(store),    // 1.125rem
font_size: F_2XLARGE(store),  // 1.5rem

// スペーシング
padding: S_MEDIUM(store),     // 1rem
margin: S_XLARGE(store),      // 1.5rem

// 幅
max_width: W_MEDIUM(store),   // 720px
```

## 高度なスタイリング

### atruleとメディアクエリ

```typescript
import { atStyle } from "qrill/core";

export function responsiveCard(store: Store): ComponentFn<{}> {
    const ResponsiveCard = element("responsive-card");
    
    registerStyle(store, ResponsiveCard, [
        // 基本スタイル
        style(ResponsiveCard)({
            padding: S_MEDIUM(store),
            background_color: colorof(store, "background", "main"),
        }),
        
        // メディアクエリ
        atStyle(["@media", "(max-width: 768px)"])(ResponsiveCard)({
            padding: S_SMALL(store),
            font_size: F_SMALL(store),
        }),
        
        // ダークモード対応
        atStyle(["@media", "(prefers-color-scheme: dark)"])(ResponsiveCard)({
            background_color: colorof(store, "background_secondary", "main"),
            color: colorof(store, "text_secondary", "main"),
        }),
    ]);
    
    return component(ResponsiveCard, (attr, ...childrenren) => (
        <ResponsiveCard {...attr}>{children}</ResponsiveCard>
    ));
}
```

### 複雑なセレクタ

```typescript
export function navigationMenu(store: Store): ComponentFn<{}> {
    const NavMenu = element("nav-menu", { tag: "nav" });
    const NavItem = element("nav-item", { tag: "li" });
    const NavLink = element("nav-link", { tag: "a" });
    
    registerStyle(store, NavMenu, [
        // 基本スタイル
        style(NavMenu)({
            display: "flex",
            gap: S_MEDIUM(store),
        }),
        
        // 子要素のスタイル
        style("ul", ">", NavItem)({
            list_style: "none",
        }),
                
        // 疑似セレクタ(ホバー効果)
        style([NavLink, ":hover"])({
            color: colorof(store, "primary", "main"),
            text_decoration: "underline",
        }),
        
        // アクティブ状態（クラス名との組み合わせ）
        style([NavLink, ".active"])({
            color: colorof(store, "primary", "main"),
            font_weight: "bold",
        }),
    ]);
    
    return component(NavMenu, () => (
        <NavMenu>
            <ul>
                <NavItem><NavLink href="/">home</NavLink></NavItem>
            </ul>
        </NavMenu>
    ));
}
```

## 実践例：カードコンポーネント

完全なカードコンポーネントの実装例：

```typescript
// 実装例

// 使用例
```

## ベストプラクティス

### 1. デザイントークンの活用

```typescript
export function button(store: Store): ComponentFn<{}> {
    const Button = element("button", { tag: "button" });
    
    registerStyle(store, Button, [
        // ❌ ハードコーディング
        // style(Button)({
        //     font_size: "16px",
        //     padding: "12px 24px",
        //     color: "#3f51b5",
        // }),

        // ✅ デザイントークンを使用
        style(Button)({
            font_size: F_MEDIUM(store),
            padding: [S_MEDIUM(store), S_LARGE(store)],
            color: colorof(store, "primary", "main"),
        }),
    ]);
    
    return component(Button, (attr, ...childrenren) => (
        <Button {...attr}>{children}</Button>
    ));
}
```

### 2. セマンティックなカラー指定

```typescript
export function semanticComponent(store: Store): ComponentFn<{}> {
    const Component = element("semantic-component");
    
    registerStyle(store, Component, [
        // ✅ 意味のあるカラー指定
        style(Component)({
            background_color: colorof(store, "background", "main"),
            color: colorof(store, "text", "main"),
            border_color: colorof(store, "primary", "light"),
        }),
    ]);
    
    return component(Component, (attr, ...childrenren) => (
        <Component {...attr}>{children}</Component>
    ));
}
```

### 3. 一貫したスペーシング

```typescript
export function spacingComponent(store: Store): ComponentFn<{}> {
    const Component = element("spacing-component");
    
    registerStyle(store, Component, [
        // ✅ 定義済みのスペーシングを使用
        style(Component)({
            margin: S_MEDIUM(store),
            padding: `${S_SMALL(store)} ${S_MEDIUM(store)}`,
            gap: S_LARGE(store),
        }),
    ]);
    
    return component(Component, (attr, ...childrenren) => (
        <Component {...attr}>{children}</Component>
    ));
}
```

### 4. レスポンシブデザイン

```typescript
export function responsiveComponent(store: Store): ComponentFn<{}> {
    const Component = element("responsive-component");
    
    registerStyle(store, Component, [
        // 基本スタイル
        style(Component)({
            font_size: F_MEDIUM(store),
            padding: S_MEDIUM(store),
        }),
        
        // ✅ メディアクエリによるレスポンシブ対応
        atStyle(["@media", "(max-width: 768px)"])(Component)({
            font_size: F_SMALL(store),
            padding: S_SMALL(store),
        }),
    ]);
    
    return component(Component, (attr, ...childrenren) => (
        <Component {...attr}>{children}</Component>
    ));
}
```

## トラブルシューティング

### よくある問題

1. **クラス名の重複**: 同じクラス名の再利用
   ```typescript
   // ❌ 重複したクラス名
   const Button1 = element("button");
   const Button2 = element("button");
   
   // ✅ 固有のクラス名
   const PrimaryButton = element("primary-button");
   const SecondaryButton = element("secondary-button");
   ```

