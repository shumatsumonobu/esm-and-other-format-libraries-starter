# esm-and-other-format-libraries-starter

[![npm version](https://img.shields.io/npm/v/esm-and-other-format-libraries-starter.svg)](https://www.npmjs.com/package/esm-and-other-format-libraries-starter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Rollup](https://img.shields.io/badge/Rollup-4.x-EC4A3F.svg?logo=rollup.js&logoColor=white)](https://rollupjs.org/)

**Write once in TypeScript, ship everywhere** — ESM, CommonJS, and UMD from a single source.

A batteries-included starter for building and publishing multi-format npm packages with TypeScript + Rollup.
Clone it, swap in your code, and publish.

This repository includes a **string utility library** (`capitalize`, `slugify`, `truncate`, `camelCase`) as a working sample.
It demonstrates the full workflow — writing modules, testing, building, and publishing — so you can see how everything fits together before replacing it with your own code.

## Table of Contents

- [Build Outputs](#build-outputs)
- [Getting Started](#getting-started)
- [Publishing to npm](#publishing-to-npm)
- [Usage](#usage)
- [Appendix: tsconfig `module` Output Comparison](#appendix-tsconfig-module-output-comparison)
- [References](#references)
- [License](#license)
- [Author](#author)

## Build Outputs

The included sample library (`mylib`) produces the following files:

| Format | File | Use Case |
|--------|------|----------|
| ES Modules | `dist/mylib.esm.js` | Bundlers (Vite, webpack, Rollup, etc.) |
| CommonJS | `dist/mylib.common.js` | Node.js `require()` |
| UMD | `dist/mylib.js` | `<script>` tag / global `window.mylib` |

> The Getting Started guide below uses `your-library` as a placeholder name. Replace it with your own library name when creating a new project.

## Getting Started

### 1. Create a Project

```sh
mkdir your-library && cd $_
npm init -y
```

### 2. Configure package.json

Add the following entry points:

```jsonc
{
  "main": "dist/your-library.common.js",   // CommonJS
  "module": "dist/your-library.esm.js",     // ES Modules
  "browser": "dist/your-library.js",        // UMD
  "types": "types/your-library.d.ts"        // TypeScript declarations
}
```

### 3. Install Dependencies

```sh
npm i -D typescript ts-node tsconfig-paths \
  rollup rollup-plugin-typescript2 @rollup/plugin-terser \
  jest @types/jest ts-jest
```

<details>
<summary>What each package does</summary>

| Package | Role |
|---------|------|
| `typescript` | TypeScript compiler |
| `ts-node` | Run TypeScript directly on Node.js |
| `tsconfig-paths` | Resolve tsconfig `paths` aliases at runtime |
| `rollup` | Module bundler |
| `rollup-plugin-typescript2` | TypeScript plugin for Rollup |
| `@rollup/plugin-terser` | Minify bundles |
| `jest` | Testing framework |
| `@types/jest` | Type definitions for Jest |
| `ts-jest` | TypeScript preprocessor for Jest |

</details>

### 4. Configure TypeScript

Create `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "declaration": true,
    "declarationDir": "./types",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noImplicitAny": true,
    "baseUrl": "./",
    "paths": { "~/*": ["src/*"] },
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

<details>
<summary>Key options explained</summary>

| Option | Value | Description |
|--------|-------|-------------|
| `target` | `ESNext` | Emit latest ECMAScript features |
| `module` | `ESNext` | Preserve `import` / `export` as-is |
| `declaration` | `true` | Generate `.d.ts` type definition files |
| `declarationDir` | `./types` | Output directory for type definitions |
| `paths` | `{"~/*": ["src/*"]}` | Use `~/` as an alias for `src/` |

</details>

### 5. Write Your Library

```sh
mkdir src
```

```ts
// src/capitalize.ts
/** Capitalize the first letter of a string. */
export default function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

```ts
// src/slugify.ts
/** Convert a string into a URL-friendly slug. */
export default function slugify(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

```ts
// src/truncate.ts
/** Truncate a string to the given length and append a suffix. */
export default function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + suffix;
}
```

```ts
// src/camelCase.ts
/** Convert a string to camelCase. */
export default function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (ch, index) =>
      index === 0 ? ch.toLowerCase() : ch.toUpperCase()
    )
    .replace(/[\s\-_]+/g, '');
}
```

```ts
// src/your-library.ts — Entry point that re-exports all modules
import capitalize from '~/capitalize';
import slugify from '~/slugify';
import truncate from '~/truncate';
import camelCase from '~/camelCase';
export { capitalize, slugify, truncate, camelCase };
```

### 6. Run on Node.js

Replace `your-library` with the actual entry point file name (e.g. `mylib` in this starter).

```sh
npx ts-node -r tsconfig-paths/register -P tsconfig.json \
  -O '{"module":"commonjs"}' \
  -e "import { capitalize, slugify } from '~/your-library'; \
      console.log(capitalize('hello'));  \
      console.log(slugify('Hello World'));"
# => Hello
# => hello-world
```

### 7. Set Up & Run Tests

Create `jest.config.js`:

```js
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/tests/'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
```

Write test files (showing two examples below — the sample library includes tests for all four functions):

```sh
mkdir tests
```

```ts
// tests/capitalize.test.ts
import { capitalize } from '~/your-library';

test('capitalizes the first letter', () => {
  expect(capitalize('hello')).toBe('Hello');
});

test('handles empty string', () => {
  expect(capitalize('')).toBe('');
});
```

```ts
// tests/slugify.test.ts
import { slugify } from '~/your-library';

test('converts spaces to hyphens', () => {
  expect(slugify('Hello World')).toBe('hello-world');
});

test('removes special characters', () => {
  expect(slugify('Hello, World!')).toBe('hello-world');
});
```

```sh
npm test
```

```
PASS  tests/capitalize.test.ts
PASS  tests/slugify.test.ts
PASS  tests/truncate.test.ts
PASS  tests/camelCase.test.ts

Test Suites: 4 passed, 4 total
Tests:       16 passed, 16 total
```

### 8. Build

Create `rollup.config.mjs`:

> **Note:** The UMD global name is derived from the `browser` field in `package.json` (e.g. `dist/mylib.js` → `window.mylib`).
> If the name contains hyphens or underscores, it will be automatically converted to camelCase (e.g. `your-library` → `window.yourLibrary`).

```js
import { createRequire } from 'node:module';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';

// Load package.json (Rollup v4 no longer supports direct JSON imports)
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default {
  external: Object.keys(pkg.dependencies || {}),
  input: './src/your-library.ts',
  plugins: [
    typescript({
      tsconfigDefaults: { compilerOptions: {} },
      tsconfig: 'tsconfig.json',
      tsconfigOverride: { compilerOptions: {} },
      useTsconfigDeclarationDir: true,
    }),
    terser(),
  ],
  output: [
    { format: 'esm', file: pkg.module },
    { format: 'cjs', file: pkg.main },
    {
      format: 'umd',
      file: pkg.browser,
      name: pkg.browser
        .replace(/^.*\/|\.js$/g, '')
        .replace(/([-_][a-z])/g, (g) =>
          g.toUpperCase().replace('-', '').replace('_', '')
        ),
    },
  ],
};
```

```sh
npm run build
```

Build output:

```
dist/
  your-library.esm.js       # ES Modules
  your-library.common.js     # CommonJS
  your-library.js            # UMD
types/
  your-library.d.ts          # Type definitions
  capitalize.d.ts
  slugify.d.ts
  truncate.d.ts
  camelCase.d.ts
```

## Publishing to npm

### Initial Setup

```sh
# Set local npm user info
npm set init.author.name 'Your name'
npm set init.author.email 'your@email.com'
npm set init.author.url 'https://your-url.com'
npm set init.license 'MIT'
npm set init.version '1.0.0'

# Log in to npm (or create a new account)
npm adduser
```

### Publish

```sh
# 1. Create a GitHub repo & clone
git clone https://github.com/your-user/your-repository.git

# 2. Exclude unnecessary files from the package
printf 'node_modules/\npackage-lock.json\n' > .npmignore

# 3. Tag and publish
git tag -a v1.0.0 -m 'My first version v1.0.0'
git push origin v1.0.0
npm publish
```

### Version Upgrade

```sh
git commit -am 'Update something'
git push
npm version patch -m "Update something"
git push --tags
npm publish
```

## Usage

The examples below use the sample library included in this repository.

```sh
npm i esm-and-other-format-libraries-starter
```

### ES Modules

Works directly in the browser — no compilation needed.

```html
<script type="module">
  import { capitalize, slugify } from './node_modules/esm-and-other-format-libraries-starter/dist/mylib.esm.js';
  console.log(capitalize('hello'));      // => 'Hello'
  console.log(slugify('Hello World'));   // => 'hello-world'
</script>
```

### CommonJS

Requires a bundler to run in the browser.

```sh
npm i -D webpack webpack-cli
```

```js
// app.js
import { capitalize, slugify } from 'esm-and-other-format-libraries-starter';
console.log(capitalize('hello'));      // => 'Hello'
console.log(slugify('Hello World'));   // => 'hello-world'
```

```sh
npx webpack app.js -o bundle.js
```

```html
<script src="bundle.js"></script>
```

### UMD

Available as a global variable — just drop in a `<script>` tag.

```html
<script src="node_modules/esm-and-other-format-libraries-starter/dist/mylib.js"></script>
<script>
  console.log(mylib.capitalize('hello'));      // => 'Hello'
  console.log(mylib.slugify('Hello World'));   // => 'hello-world'
</script>
```

## Appendix: tsconfig `module` Output Comparison

<details>
<summary>Click to expand</summary>

This appendix uses a minimal example to illustrate how the `module` setting in tsconfig affects compiled output.

```ts
// src/app.ts
import capitalize from './capitalize';
const result = capitalize('hello');
```

```ts
// src/capitalize.ts
export default function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

### `module: "es2015"` / `"ESNext"`

`import` / `export` statements are preserved as-is.

```js
// dist/app.js
import capitalize from './capitalize';
const result = capitalize('hello');
```

```js
// dist/capitalize.js
export default function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

### `module: "commonjs"`

Converted to `require()` / `exports`.

```js
// dist/app.js
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const capitalize_1 = __importDefault(require("./capitalize"));
const result = capitalize_1.default('hello');
```

```js
// dist/capitalize.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.default = default_1;
```

### `module: "amd"`

Wrapped in AMD `define()`.

```js
// dist/app.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./capitalize"], function (require, exports, capitalize_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    capitalize_1 = __importDefault(capitalize_1);
    const result = capitalize_1.default('hello');
});
```

```js
// dist/capitalize.js
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    exports.default = default_1;
});
```

### `module: "system"`

Wrapped in SystemJS `System.register()`.

```js
// dist/app.js
System.register(["./capitalize"], function (exports_1, context_1) {
    "use strict";
    var capitalize_1, result;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (capitalize_1_1) {
                capitalize_1 = capitalize_1_1;
            }
        ],
        execute: function () {
            result = capitalize_1.default('hello');
        }
    };
});
```

```js
// dist/capitalize.js
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function default_1(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    exports_1("default", default_1);
    return {
        setters: [],
        execute: function () {
        }
    };
});
```

### `module: "umd"`

Wrapped in a universal loader that supports both CommonJS and AMD.

```js
// dist/app.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./capitalize"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const capitalize_1 = __importDefault(require("./capitalize"));
    const result = capitalize_1.default('hello');
});
```

```js
// dist/capitalize.js
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    exports.default = default_1;
});
```

</details>

## References

- [TypeScript Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

## License

[MIT](LICENSE)

## Author

- Twitter: [@shumatsumonobu](https://x.com/shumatsumonobu)
- GitHub: [shumatsumonobu](https://github.com/shumatsumonobu)
- Mail: shumatsumonobu@gmail.com
