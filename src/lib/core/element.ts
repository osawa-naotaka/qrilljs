export type Tag = keyof TagAttribute;
export type AttributeOf<K extends Tag> = TagAttribute[K];

export type QrillTag = "raw" | "unwrap" | "class";
export const qrill_tags: QrillTag[] = ["raw", "unwrap", "class"] as const;

export function DOCTYPE(): string {
    return "<!DOCTYPE html>";
}

export const tags: Tag[] = [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
] as const;

// 各HTML要素に対応する属性型を表すマップ型
export type TagAttribute = {
    a: AAttribute;
    abbr: AbbrAttribute;
    address: AddressAttribute;
    area: AreaAttribute;
    article: ArticleAttribute;
    aside: AsideAttribute;
    audio: AudioAttribute;
    b: BAttribute;
    base: BaseAttribute;
    bdi: BdiAttribute;
    bdo: BdoAttribute;
    blockquote: BlockquoteAttribute;
    body: BodyAttribute;
    br: BrAttribute;
    button: ButtonAttribute;
    canvas: CanvasAttribute;
    caption: CaptionAttribute;
    cite: CiteAttribute;
    code: CodeAttribute;
    col: ColAttribute;
    colgroup: ColgroupAttribute;
    data: DataAttribute;
    datalist: DatalistAttribute;
    dd: DdAttribute;
    del: DelAttribute;
    details: DetailsAttribute;
    dfn: DfnAttribute;
    dialog: DialogAttribute;
    div: DivAttribute;
    dl: DlAttribute;
    dt: DtAttribute;
    em: EmAttribute;
    embed: EmbedAttribute;
    fieldset: FieldsetAttribute;
    figcaption: FigcaptionAttribute;
    figure: FigureAttribute;
    footer: FooterAttribute;
    form: FormAttribute;
    h1: H1Attribute;
    h2: H2Attribute;
    h3: H3Attribute;
    h4: H4Attribute;
    h5: H5Attribute;
    h6: H6Attribute;
    head: HeadAttribute;
    header: HeaderAttribute;
    hgroup: HgroupAttribute;
    hr: HrAttribute;
    html: HtmlAttribute;
    i: IAttribute;
    iframe: IframeAttribute;
    img: ImgAttribute;
    input: InputAttribute;
    ins: InsAttribute;
    kbd: KbdAttribute;
    label: LabelAttribute;
    legend: LegendAttribute;
    li: LiAttribute;
    link: LinkAttribute;
    main: MainAttribute;
    map: MapAttribute;
    mark: MarkAttribute;
    menu: MenuAttribute;
    meta: MetaAttribute;
    meter: MeterAttribute;
    nav: NavAttribute;
    noscript: NoscriptAttribute;
    object: ObjectAttribute;
    ol: OlAttribute;
    optgroup: OptgroupAttribute;
    option: OptionAttribute;
    output: OutputAttribute;
    p: PAttribute;
    picture: PictureAttribute;
    pre: PreAttribute;
    progress: ProgressAttribute;
    q: QAttribute;
    rp: RpAttribute;
    rt: RtAttribute;
    ruby: RubyAttribute;
    s: SAttribute;
    samp: SampAttribute;
    script: ScriptAttribute;
    search: SearchAttribute;
    section: SectionAttribute;
    select: SelectAttribute;
    slot: SlotAttribute;
    small: SmallAttribute;
    source: SourceAttribute;
    span: SpanAttribute;
    strong: StrongAttribute;
    style: StyleAttribute;
    sub: SubAttribute;
    summary: SummaryAttribute;
    sup: SupAttribute;
    svg: SVGAttribute;
    table: TableAttribute;
    tbody: TbodyAttribute;
    td: TdAttribute;
    template: TemplateAttribute;
    textarea: TextareaAttribute;
    tfoot: TfootAttribute;
    th: ThAttribute;
    thead: TheadAttribute;
    time: TimeAttribute;
    title: TitleAttribute;
    tr: TrAttribute;
    track: TrackAttribute;
    u: UAttribute;
    ul: UlAttribute;
    var: VarAttribute;
    video: VideoAttribute;
    wbr: WbrAttribute;

    unwrap: DivAttribute;
    raw: DivAttribute;
    class: DivAttribute;
};

// HTML要素の共通属性
type GlobalAttributes = {
    accesskey: string;
    autocapitalize: "off" | "none" | "on" | "sentences" | "words" | "characters";
    autofocus: null;
    class: string | string[];
    contenteditable: "true" | "false" | "";
    dir: "ltr" | "rtl" | "auto";
    draggable: "true" | "false";
    enterkeyhint: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
    hidden: null | "hidden" | "until-found";
    id: string;
    inert: null;
    inputmode: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
    is: string;
    itemid: string;
    itemprop: string | string[];
    itemref: string | string[];
    itemscope: null;
    itemtype: string | string[];
    lang: string;
    nonce: string;
    part: string | string[];
    popover: null;
    slot: string;
    spellcheck: "true" | "false";
    tabindex: string;
    title: string;
    translate: "yes" | "no";
    // biome-ignore lint: using any.
    children: any;
    // biome-ignore lint: using any.
    key: any;
};

// HTML要素ごとの属性型定義
type AAttribute = {
    attributionsrc: string | string[];
    download: string | null;
    href: string;
    hreflang: string;
    ping: string | string[];
    referrerpolicy:
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url";
    rel: string | string[];
    target: string;
    type: string;
} & GlobalAttributes;

type AbbrAttribute = GlobalAttributes;

type AddressAttribute = GlobalAttributes;

type AreaAttribute = {
    alt: string;
    coords: string;
    download: string | null;
    href: string;
    hreflang: string;
    ping: string | string[];
    referrerpolicy:
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url";
    rel: string | string[];
    shape: "rect" | "circle" | "poly" | "default";
    target: string;
} & GlobalAttributes;

type ArticleAttribute = GlobalAttributes;

type AsideAttribute = GlobalAttributes;

type AudioAttribute = {
    autoplay: null;
    controls: null;
    crossorigin: "anonymous" | "use-credentials";
    disableremoteplayback: null;
    loop: null;
    muted: null;
    preload: "none" | "metadata" | "auto" | "";
    src: string;
} & GlobalAttributes;

type BAttribute = GlobalAttributes;

type BaseAttribute = {
    href: string;
    target: string;
} & GlobalAttributes;

type BdiAttribute = GlobalAttributes;

type BdoAttribute = {
    dir: "ltr" | "rtl";
} & GlobalAttributes;

type BlockquoteAttribute = {
    cite: string;
} & GlobalAttributes;

type BodyAttribute = GlobalAttributes;

type BrAttribute = GlobalAttributes;

type ButtonAttribute = {
    disabled: null;
    form: string;
    formaction: string;
    formenctype: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
    formmethod: "post" | "get" | "dialog";
    formnovalidate: null;
    formtarget: string;
    name: string;
    popovertarget: string;
    popovertargetaction: "toggle" | "show" | "hide";
    type: "submit" | "reset" | "button";
    value: string;
} & GlobalAttributes;

type CanvasAttribute = {
    height: string;
    width: string;
} & GlobalAttributes;

type CaptionAttribute = GlobalAttributes;

type CiteAttribute = GlobalAttributes;

type CodeAttribute = GlobalAttributes;

type ColAttribute = {
    span: string;
} & GlobalAttributes;

type ColgroupAttribute = {
    span: string;
} & GlobalAttributes;

type DataAttribute = {
    value: string;
} & GlobalAttributes;

type DatalistAttribute = GlobalAttributes;

type DdAttribute = GlobalAttributes;

type DelAttribute = {
    cite: string;
    datetime: string;
} & GlobalAttributes;

type DetailsAttribute = {
    open: null;
} & GlobalAttributes;

type DfnAttribute = GlobalAttributes;

type DialogAttribute = {
    open: null;
} & GlobalAttributes;

type DivAttribute = GlobalAttributes;

type DlAttribute = GlobalAttributes;

type DtAttribute = GlobalAttributes;

type EmAttribute = GlobalAttributes;

type EmbedAttribute = {
    height: string;
    src: string;
    type: string;
    width: string;
} & GlobalAttributes;

type FieldsetAttribute = {
    disabled: null;
    form: string;
    name: string;
} & GlobalAttributes;

type FigcaptionAttribute = GlobalAttributes;

type FigureAttribute = GlobalAttributes;

type FooterAttribute = GlobalAttributes;

type FormAttribute = {
    acceptcharset: string;
    action: string;
    autocomplete: "on" | "off";
    enctype: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
    method: "post" | "get" | "dialog";
    name: string;
    novalidate: null;
    rel: string | string[];
    target: string;
} & GlobalAttributes;

type H1Attribute = GlobalAttributes;

type H2Attribute = GlobalAttributes;

type H3Attribute = GlobalAttributes;

type H4Attribute = GlobalAttributes;

type H5Attribute = GlobalAttributes;

type H6Attribute = GlobalAttributes;

type HeadAttribute = GlobalAttributes;

type HeaderAttribute = GlobalAttributes;

type HgroupAttribute = GlobalAttributes;

type HrAttribute = GlobalAttributes;

type HtmlAttribute = {
    xmlns: string;
} & GlobalAttributes;

type IAttribute = GlobalAttributes;

type IframeAttribute = {
    allow: string | string[];
    allowfullscreen: null;
    height: string;
    loading: "lazy" | "eager";
    name: string;
    referrerpolicy:
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url";
    sandbox: string | string[];
    src: string;
    srcdoc: string;
    width: string;
} & GlobalAttributes;

type ImgAttribute = {
    alt: string;
    crossorigin: "anonymous" | "use-credentials";
    decoding: "sync" | "async" | "auto";
    fetchpriority: "auto" | "high" | "low";
    height: string;
    ismap: null;
    loading: "lazy" | "eager";
    referrerpolicy:
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url";
    sizes: string | string[];
    src: string;
    srcset: string | string[];
    usemap: string;
    width: string;
} & GlobalAttributes;

type InputAttribute = {
    accept: string | string[];
    alt: string;
    autocomplete: string;
    capture: "user" | "environment" | "";
    checked: null;
    dirname: string;
    disabled: null;
    form: string;
    formaction: string;
    formenctype: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
    formmethod: "post" | "get" | "dialog";
    formnovalidate: null;
    formtarget: string;
    height: string;
    list: string;
    max: string;
    maxlength: string;
    min: string;
    minlength: string;
    multiple: null;
    name: string;
    pattern: string;
    placeholder: string;
    popovertarget: string;
    popovertargetaction: "toggle" | "show" | "hide";
    readonly: null;
    required: null;
    size: string;
    src: string;
    step: string;
    type:
        | "button"
        | "checkbox"
        | "color"
        | "date"
        | "datetime-local"
        | "email"
        | "file"
        | "hidden"
        | "image"
        | "month"
        | "number"
        | "password"
        | "radio"
        | "range"
        | "reset"
        | "search"
        | "submit"
        | "tel"
        | "text"
        | "time"
        | "url"
        | "week";
    value: string;
    width: string;
} & GlobalAttributes;

type InsAttribute = {
    cite: string;
    datetime: string;
} & GlobalAttributes;

type KbdAttribute = GlobalAttributes;

type LabelAttribute = {
    for: string;
    form: string;
} & GlobalAttributes;

type LegendAttribute = GlobalAttributes;

type LiAttribute = {
    value: string;
} & GlobalAttributes;

type LinkAttribute = {
    as:
        | "audio"
        | "document"
        | "embed"
        | "fetch"
        | "font"
        | "image"
        | "object"
        | "script"
        | "style"
        | "track"
        | "video"
        | "worker";
    crossorigin: "anonymous" | "use-credentials";
    disabled: null;
    fetchpriority: "auto" | "high" | "low";
    href: string;
    hreflang: string;
    imagesizes: string | string[];
    imagesrcset: string | string[];
    integrity: string;
    media: string;
    referrerpolicy:
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url";
    rel: string | string[];
    sizes: string | string[];
    title: string;
    type: string;
} & GlobalAttributes;

type MainAttribute = GlobalAttributes;

type MapAttribute = {
    name: string;
} & GlobalAttributes;

type MarkAttribute = GlobalAttributes;

type MenuAttribute = GlobalAttributes;

type MetaAttribute = {
    charset: string;
    content: string;
    "http-equiv": "content-security-policy" | "content-type" | "default-style" | "x-ua-compatible" | "refresh";
    http_equiv: "content-security-policy" | "content-type" | "default-style" | "x-ua-compatible" | "refresh";
    media: string;
    name: string;
} & GlobalAttributes;

type MeterAttribute = {
    form: string;
    high: string;
    low: string;
    max: string;
    min: string;
    optimum: string;
    value: string;
} & GlobalAttributes;

type NavAttribute = GlobalAttributes;

type NoscriptAttribute = GlobalAttributes;

type ObjectAttribute = {
    data: string;
    form: string;
    height: string;
    name: string;
    type: string;
    usemap: string;
    width: string;
} & GlobalAttributes;

type OlAttribute = {
    reversed: null;
    start: string;
    type: "1" | "a" | "A" | "i" | "I";
} & GlobalAttributes;

type OptgroupAttribute = {
    disabled: null;
    label: string;
} & GlobalAttributes;

type OptionAttribute = {
    disabled: null;
    label: string;
    selected: null;
    value: string;
} & GlobalAttributes;

type OutputAttribute = {
    for: string | string[];
    form: string;
    name: string;
} & GlobalAttributes;

type PAttribute = GlobalAttributes;

type PictureAttribute = GlobalAttributes;

type PreAttribute = GlobalAttributes;

type ProgressAttribute = {
    max: string;
    value: string;
} & GlobalAttributes;

type QAttribute = {
    cite: string;
} & GlobalAttributes;

type RpAttribute = GlobalAttributes;

type RtAttribute = GlobalAttributes;

type RubyAttribute = GlobalAttributes;

type SAttribute = GlobalAttributes;

type SampAttribute = GlobalAttributes;

type ScriptAttribute = {
    async: null;
    crossorigin: "anonymous" | "use-credentials";
    defer: null;
    fetchpriority: "auto" | "high" | "low";
    integrity: string;
    nomodule: null;
    referrerpolicy:
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url";
    src: string;
    type: string;
} & GlobalAttributes;

type SearchAttribute = GlobalAttributes;

type SectionAttribute = GlobalAttributes;

type SelectAttribute = {
    autocomplete: "on" | "off";
    disabled: null;
    form: string;
    multiple: null;
    name: string;
    required: null;
    size: string;
} & GlobalAttributes;

type SlotAttribute = {
    name: string;
} & GlobalAttributes;

type SmallAttribute = GlobalAttributes;

type SourceAttribute = {
    height: string;
    media: string;
    sizes: string | string[];
    src: string;
    srcset: string | string[];
    type: string;
    width: string;
} & GlobalAttributes;

type SpanAttribute = GlobalAttributes;

type StrongAttribute = GlobalAttributes;

type StyleAttribute = {
    media: string;
    nonce: string;
    title: string;
} & GlobalAttributes;

type SubAttribute = GlobalAttributes;

type SummaryAttribute = GlobalAttributes;

type SupAttribute = GlobalAttributes;

type SVGAttribute = {
    height: string;
    width: string;
    xmlns: string;
} & GlobalAttributes;

type TableAttribute = GlobalAttributes;

type TbodyAttribute = GlobalAttributes;

type TdAttribute = {
    colspan: string;
    headers: string | string[];
    rowspan: string;
} & GlobalAttributes;

type TemplateAttribute = {
    shadowrootmode: "open" | "closed";
} & GlobalAttributes;

type TextareaAttribute = {
    autocomplete: "on" | "off";
    cols: string;
    dirname: string;
    disabled: null;
    form: string;
    maxlength: string;
    minlength: string;
    name: string;
    placeholder: string;
    readonly: null;
    required: null;
    rows: string;
    wrap: "hard" | "soft";
} & GlobalAttributes;

type TfootAttribute = GlobalAttributes;

type ThAttribute = {
    abbr: string;
    colspan: string;
    headers: string | string[];
    rowspan: string;
    scope: "row" | "col" | "rowgroup" | "colgroup";
} & GlobalAttributes;

type TheadAttribute = GlobalAttributes;

type TimeAttribute = {
    datetime: string;
} & GlobalAttributes;

type TitleAttribute = GlobalAttributes;

type TrAttribute = GlobalAttributes;

type TrackAttribute = {
    default: null;
    kind: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
    label: string;
    src: string;
    srclang: string;
} & GlobalAttributes;

type UAttribute = GlobalAttributes;

type UlAttribute = GlobalAttributes;

type VarAttribute = GlobalAttributes;

type VideoAttribute = {
    autoplay: null;
    controls: null;
    crossorigin: "anonymous" | "use-credentials";
    disablepictureinpicture: null;
    disableremoteplayback: null;
    height: string;
    loop: null;
    muted: null;
    playsinline: null;
    poster: string;
    preload: "none" | "metadata" | "auto" | "";
    src: string;
    width: string;
} & GlobalAttributes;

type WbrAttribute = GlobalAttributes;

// グローバル属性の名前のユニオン型
export type GlobalAttributeNames =
    | "accesskey"
    | "autocapitalize"
    | "autofocus"
    | "class"
    | "contenteditable"
    | "dir"
    | "draggable"
    | "enterkeyhint"
    | "hidden"
    | "id"
    | "inert"
    | "inputmode"
    | "is"
    | "itemid"
    | "itemprop"
    | "itemref"
    | "itemscope"
    | "itemtype"
    | "lang"
    | "nonce"
    | "part"
    | "popover"
    | "slot"
    | "spellcheck"
    | "tabindex"
    | "title"
    | "translate";

// 全ての属性名のユニオン型
export type AttributeNames =
    | GlobalAttributeNames
    | "abbr"
    | "accept"
    | "acceptcharset"
    | "action"
    | "allow"
    | "allowfullscreen"
    | "alt"
    | "as"
    | "async"
    | "attributionsrc"
    | "autocomplete"
    | "autoplay"
    | "capture"
    | "charset"
    | "checked"
    | "cite"
    | "cols"
    | "colspan"
    | "content"
    | "controls"
    | "coords"
    | "crossorigin"
    | "data"
    | "datetime"
    | "decoding"
    | "default"
    | "defer"
    | "dirname"
    | "disabled"
    | "disablepictureinpicture"
    | "disableremoteplayback"
    | "download"
    | "enctype"
    | "fetchpriority"
    | "for"
    | "form"
    | "formaction"
    | "formenctype"
    | "formmethod"
    | "formnovalidate"
    | "formtarget"
    | "headers"
    | "height"
    | "high"
    | "href"
    | "hreflang"
    | "http-equiv"
    | "http_equiv"
    | "imagesizes"
    | "imagesrcset"
    | "integrity"
    | "ismap"
    | "kind"
    | "label"
    | "list"
    | "loading"
    | "loop"
    | "low"
    | "max"
    | "maxlength"
    | "media"
    | "method"
    | "min"
    | "minlength"
    | "multiple"
    | "muted"
    | "name"
    | "nomodule"
    | "novalidate"
    | "open"
    | "optimum"
    | "pattern"
    | "ping"
    | "placeholder"
    | "playsinline"
    | "popovertarget"
    | "popovertargetaction"
    | "poster"
    | "preload"
    | "readonly"
    | "referrerpolicy"
    | "rel"
    | "required"
    | "reversed"
    | "rows"
    | "rowspan"
    | "sandbox"
    | "scope"
    | "selected"
    | "shadowrootmode"
    | "shape"
    | "size"
    | "sizes"
    | "span"
    | "src"
    | "srcdoc"
    | "srclang"
    | "srcset"
    | "start"
    | "step"
    | "target"
    | "type"
    | "usemap"
    | "value"
    | "width"
    | "wrap"
    | "xmlns"
    | `data-${string}`;

export const attribute_names: AttributeNames[] = [
    "accesskey",
    "autocapitalize",
    "autofocus",
    "class",
    "contenteditable",
    "dir",
    "draggable",
    "enterkeyhint",
    "hidden",
    "id",
    "inert",
    "inputmode",
    "is",
    "itemid",
    "itemprop",
    "itemref",
    "itemscope",
    "itemtype",
    "lang",
    "nonce",
    "part",
    "popover",
    "slot",
    "spellcheck",
    "tabindex",
    "title",
    "translate",
    "abbr",
    "accept",
    "acceptcharset",
    "action",
    "allow",
    "allowfullscreen",
    "alt",
    "as",
    "async",
    "attributionsrc",
    "autocomplete",
    "autoplay",
    "capture",
    "charset",
    "checked",
    "cite",
    "cols",
    "colspan",
    "content",
    "controls",
    "coords",
    "crossorigin",
    "data",
    "datetime",
    "decoding",
    "default",
    "defer",
    "dirname",
    "disabled",
    "disablepictureinpicture",
    "disableremoteplayback",
    "download",
    "enctype",
    "fetchpriority",
    "for",
    "form",
    "formaction",
    "formenctype",
    "formmethod",
    "formnovalidate",
    "formtarget",
    "headers",
    "height",
    "high",
    "href",
    "hreflang",
    "http-equiv",
    "http_equiv",
    "imagesizes",
    "imagesrcset",
    "integrity",
    "ismap",
    "kind",
    "label",
    "list",
    "loading",
    "loop",
    "low",
    "max",
    "maxlength",
    "media",
    "method",
    "min",
    "minlength",
    "multiple",
    "muted",
    "name",
    "nomodule",
    "novalidate",
    "open",
    "optimum",
    "pattern",
    "ping",
    "placeholder",
    "playsinline",
    "popovertarget",
    "popovertargetaction",
    "poster",
    "preload",
    "readonly",
    "referrerpolicy",
    "rel",
    "required",
    "reversed",
    "rows",
    "rowspan",
    "sandbox",
    "scope",
    "selected",
    "shadowrootmode",
    "shape",
    "size",
    "sizes",
    "span",
    "src",
    "srcdoc",
    "srclang",
    "srcset",
    "start",
    "step",
    "target",
    "type",
    "usemap",
    "value",
    "width",
    "wrap",
    "xmlns",
] as const;
