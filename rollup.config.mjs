import { createRequire } from 'node:module';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';

// Load package.json (Rollup v4 no longer supports direct JSON imports)
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default {
  // Exclude dependencies from the bundle (they'll be resolved at runtime)
  external: Object.keys(pkg['dependencies'] || []),

  // Library entry point
  input: './src/mylib.ts',

  plugins: [
    // Compile TypeScript using the project's tsconfig.json
    typescript({
      tsconfigDefaults: { compilerOptions: {} },
      tsconfig: "tsconfig.json",
      tsconfigOverride: { compilerOptions: {} },
      useTsconfigDeclarationDir: true
    }),

    // Minify the output
    terser()
  ],

  // Output in three formats from a single source
  output: [
    // ESM — for modern bundlers (Vite, webpack, Rollup, etc.)
    {
      format: 'esm',
      file: pkg.module
    },

    // CommonJS — for Node.js require()
    {
      format: 'cjs',
      file: pkg.main
    },

    // UMD — for <script> tags, exposes a global variable
    // Snake-case names are auto-converted to camelCase (e.g. "my-lib" → window.myLib)
    {
      format: 'umd',
      file: pkg.browser,
      name: pkg.browser
        .replace(/^.*\/|\.js$/g, '')
        .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))
    }
  ]
}
