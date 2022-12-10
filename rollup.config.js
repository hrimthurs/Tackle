import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcFolder = path.join(__dirname, './src')
const dstFolder = path.join(__dirname, './build')

function transpile() {
    return babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    })
}

function roll(name, format, outFile, ...usePlugins) {
    return {
        input: path.join(srcFolder, name + '.js'),
        output: {
            format,
            file: path.join(dstFolder, outFile.replace(/\[name\]/g, name)),
            name: format === 'umd' ? name : undefined,
            exports: 'named',
        },
        plugins: usePlugins.map(func => func())
    }
}

export default [
    roll('Tackle', 'esm', '[name].js'),
    roll('Tackle', 'cjs', '[name].cjs'),
    roll('Tackle', 'umd', '[name].min.js', terser),
    roll('Tackle', 'umd', '[name].min.legacy.js', transpile, terser),
    roll('TkArray', 'umd', '[name].min.js', terser),
    roll('TkArray', 'umd', '[name].min.legacy.js', transpile, terser),
    roll('TkString', 'umd', '[name].min.js', terser),
    roll('TkString', 'umd', '[name].min.legacy.js', transpile, terser),
    roll('TkObject', 'umd', '[name].min.js', terser),
    roll('TkObject', 'umd', '[name].min.legacy.js', transpile, terser),
    roll('TkFunction', 'umd', '[name].min.js', terser),
    roll('TkFunction', 'umd', '[name].min.legacy.js', transpile, terser),
    roll('TkService', 'umd', '[name].min.js', terser),
    roll('TkService', 'umd', '[name].min.legacy.js', transpile, terser)
]