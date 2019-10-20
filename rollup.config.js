import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  external: ['chrome'],
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/devtools/bundle.js',
    globals: {
      chrome: 'chrome',
    },
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write('public/devtools/bundle.css')
      },
    }),
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    commonjs(),
    !production && livereload('public'),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}
