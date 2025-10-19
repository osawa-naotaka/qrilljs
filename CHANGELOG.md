# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

- Added: for new features.
- Changed: for changes in existing functionality.
- Deprecated: for soon-to-be removed features.
- Removed: for now removed features.
- Fixed: for any bug fixes.
- Security: in case of vulnerabilities.

## [Unreleased]

## [0.1.0-alpha.30] - 2025-10-20

### Changed
- Updated svg2woff2 package to v0.3.4 to fix a regression bug.

### Fixed
- Fixed woff2 font generation by adding required timestamp property.

## [0.1.0-alpha.29] - 2025-10-19

### Changed
- Updated dependency packages for security improvements.

## [0.1.0-alpha.28] - 2025-10-17

### Fixed
- Fixed page reload cache initialization issue that was preventing proper cache clearing.

### Changed
- Migrated from Yarn to Bun as the package manager, removing yarn.lock and adding bun.lock.

## [0.1.0-alpha.27] - 2025-10-16

### Added
- Introduced Designator type for referencing component names without implementations, primarily for use with style() function.
- Added AnyComponentFn type which was previously missing.

### Fixed
- Fixed type error when boolean values were used as elements (they are now properly ignored and not rendered).

## [0.1.0-alpha.26] - 2025-10-16

### Fixed
- Fixed CSS validation error caused by scrollbar_width.
- Fixed an issue where jsx() did not show type errors for invalid values inside {} expressions.
- Fixed dom function to correctly assign multiple field properties.
- Fixed client function element count bug.
- Fixed site argument handling for children position.
- Fixed treatment of deep structure of node.prop.children.

### Changed
- Renamed HNode to QNode, HElement to QElement, HElementFn to QElementFn, HComponentFn to ComponentFn, HRootPageFn to RootPageFn, and HClientFn to ClientFn.
- Changed page import scheme to prevent multiple imports.
- Re-implemented jsx with improved type checking and structure handling.

## [0.1.0-alpha.25] - 2025-10-13

### Changed
- Updated nix flake and npm packages to latest versions.
- Enhanced client-side component scripting to enable querySelector() for child elements of defined component root elements.
  - Modified HClientFn arguments to pass the parent element of the component where the script is defined.
  - Updated element() second argument to add the specified name string as a class.
  - These changes enable querying child elements by calling querySelector() on the parent element with the configured name.

## [0.1.0-alpha.24] - 2025-10-12

### Changed
- Changed the element() function signature to accept all options as the second argument.

## [0.1.0-alpha.23] - 2025-10-11
### Fixed
- fixed an issue where multi-calling registerStyle() result in clear previous style.

### Removed
- remove registerStyle()

### Added
- add registerStyle(), registerScript(), registerAsset(), registerInsert(), registerFont().

## [0.1.0-alpha.22] - 2025-10-11

### Changed
- Remove unused capitalized tags and use gt() instead.
- Update error page using tsx.

## [0.1.0-alpha.21] - 2025-10-10

### Fixed
- Fixed an issue where internal include path of client function is invalid.

### Added
- Add selectorOf() function to retrive component selector.

## [0.1.0-alpha.20] - 2025-10-10
### Fixed
- Fixed an issue where falsy value in tsx node results in abort.

## [0.1.0-alpha.19] - 2025-10-09
### Added
- Add ToC type export from remark-export-toc.

## [0.1.0-alpha.18] - 2025-10-08
### Fixed
- Fixed an issue where second-level argument of atStyle()()() requires one more bracket("[]").

## [0.1.0-alpha.17] - 2025-10-08
### Changed
- update package dependencies for remark-export-toc

## [0.1.0-alpha.16] - 2025-10-05
### Fixed
- Fixed an issue where WebSocket connections were not closing properly during browser page transitions


## [0.1.0-alpha.15] - 2025-10-03
### Changed
- return value of markdownToHtml() is changed to add ToC information with html string.
  - headings of this html includes ids for ToC

## [0.1.0-alpha.14] - 2025-10-03
### Fixed
- unintended reset in INIT_CSS is fixed.

## [0.1.0-alpha.13] - 2025-10-02
### Changed
- INIT_CSS style is updated to reset almost all styles.

### Removed
- most of styles defined in stylerules.ts is removed.

## [0.1.0-alpha.12] - 2025-10-02
### Changed
- change element() function argument. change order and object structure.

## [0.1.0-alpha.11] - 2025-10-01
### Changed
- change element() function argument. insert Store as a first argument and change argument order.
- auto-generated class name for css is now include hash value to distinct between instances from same component. we no longer care about class name collision.

### Removed
- as() is no longer needed, because of the reason mensioned above. but still implemented. maybe use it for another reason.

## [0.1.0-alpha.10] - 2025-10-01
### Added
- add rehype-prism-plus functionarity to highlight markdown.

## [0.1.0-alpha.9] - 2025-09-30
### Added
- add a simple design system documentation.

### Fixed
- fix bug that dev server outputs collapse html/css because of async problem between http requests.
  - shareing Store between pages results in collapse page.

## [0.1.0-alpha.8] - 2025-09-28
### Changed
- Renamed project from "zephblaze" to "qrill"
- color part of design structure is totaly changed.

### Remove
- Remove and change design functions. Design system is now under reconstruction.

## [0.1.0-alpha.7] - 2025-09-27
### Added
- import default export of site/site.config.ts to configure original design.

### Changed
- update error page to show more information.

## [0.1.0-alpha.6] - 2025-09-26
### Fixed
- fix zephblaze install scheme (with typescript tsc)
- fix bug that unintended reference to site.config.ts.
- fix bug of error page garbling at dev server.

### Removed
- remove unused packages from package.json

## [0.1.0-alpha.5] - 2025-08-24
### Added
- Comprehensive release process documentation in CLAUDE.md

### Fixed
- Fixed buffer reference range bug in Response() constructor in serve.ts

### Changed
- Removed package-lock.json in favor of yarn.lock

## [0.1.0-alpha.4] - 2025-08-24
### Added
- Added user guide documentation

### Changed
- Updated development environment versions for Node.js, Deno, and Bun

### Fixed
- Fixed bug where `zephblaze build` processAnyDotTs() function would fail to create the dist directory
- Fixed Response() constructor arguments to be compatible with updated runtime environments

## [0.1.0-alpha.3] - 2025-08-11
### Fixed
- Fixed bin field format from string to object for better npm compatibility

## [0.1.0-alpha.2] - 2025-08-11
### Changed
- Renamed project from "hanabi" to "zephblaze"
- Updated integration tests
- Added import fields to package.json exports for better ESM compatibility

## [0.1.0-alpha.1] - 2025-08-11
### Added
- Initial implementation of lightweight, type-safe static site generator (SSG)
- TypeScript and TSX syntax support for component-based development
- File-based routing with dynamic parameters (`[param]` syntax)
- Markdown support with Gray Matter, remark, and rehype ecosystem
- Development server with hot reload using WebSocket
- FontAwesome SVG icon optimization and woff2 font generation
- Multi-runtime support (Node.js/Bun/Deno)
- CLI tools (`hanabi build`, `hanabi dev` commands)
- Component-level asset management with tree shaking
- Unified development experience for server-side and client-side

[Unreleased]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.30...HEAD
[0.1.0-alpha.30]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.29...v0.1.0-alpha.30
[0.1.0-alpha.29]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.28...v0.1.0-alpha.29
[0.1.0-alpha.28]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.27...v0.1.0-alpha.28
[0.1.0-alpha.27]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.26...v0.1.0-alpha.27
[0.1.0-alpha.26]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.25...v0.1.0-alpha.26
[0.1.0-alpha.25]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.24...v0.1.0-alpha.25
[0.1.0-alpha.24]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.23...v0.1.0-alpha.24
[0.1.0-alpha.23]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.22...v0.1.0-alpha.23
[0.1.0-alpha.22]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.21...v0.1.0-alpha.22
[0.1.0-alpha.21]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.20...v0.1.0-alpha.21
[0.1.0-alpha.20]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.19...v0.1.0-alpha.20
[0.1.0-alpha.19]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.18...v0.1.0-alpha.19
[0.1.0-alpha.18]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.17...v0.1.0-alpha.18
[0.1.0-alpha.17]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.16...v0.1.0-alpha.17
[0.1.0-alpha.16]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.15...v0.1.0-alpha.16
[0.1.0-alpha.15]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.14...v0.1.0-alpha.15
[0.1.0-alpha.14]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.13...v0.1.0-alpha.14
[0.1.0-alpha.13]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.12...v0.1.0-alpha.13
[0.1.0-alpha.12]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.11...v0.1.0-alpha.12
[0.1.0-alpha.11]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.10...v0.1.0-alpha.11
[0.1.0-alpha.10]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.9...v0.1.0-alpha.10
[0.1.0-alpha.9]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.8...v0.1.0-alpha.9
[0.1.0-alpha.8]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.7...v0.1.0-alpha.8
[0.1.0-alpha.7]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.6...v0.1.0-alpha.7
[0.1.0-alpha.6]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.5...v0.1.0-alpha.6
[0.1.0-alpha.5]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.4...v0.1.0-alpha.5
[0.1.0-alpha.4]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.3...v0.1.0-alpha.4
[0.1.0-alpha.3]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.2...v0.1.0-alpha.3
[0.1.0-alpha.2]: https://github.com/osawa-naotaka/qrill/compare/v0.1.0-alpha.1...v0.1.0-alpha.2
