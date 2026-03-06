# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.1.0] - 2026-03-06

### Changed

- Replace sample library from simple `add`/`sub` math functions to a practical **string utility library** (`capitalize`, `slugify`, `truncate`, `camelCase`)
- Rewrite README with clearer structure, badges, and table of contents
- **Upgrade all dependencies to latest versions:**
  - TypeScript 3.7 → 5.7
  - Rollup 1.x → 4.x
  - Jest 24 → 29
  - `rollup-plugin-terser` → `@rollup/plugin-terser`
- Remove unused `ts-loader`, `webpack`, `webpack-cli` from devDependencies

## [1.0.1] - 2019-12-01

### Fixed

- Auto-convert snake-case UMD library names to camelCase in the global namespace (e.g. `your-library` → `window.yourLibrary`)

## [1.0.0] - 2019-12-01

### Added

- Initial release
- TypeScript + Rollup build pipeline outputting ESM, CommonJS, and UMD formats
- Jest test setup with `ts-jest` and path alias support
- Sample library with `add` and `sub` functions
- npm publishing guide
