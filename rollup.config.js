import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

import pkg from './package.json' assert { type: 'json' }

import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = global['__filename'] = fileURLToPath(import.meta.url)
const __dirname = global['__dirname'] = path.dirname(__filename)

const srcFolder = path.join(__dirname, './src')
const dstFolder = path.join(__dirname, './build')

function transpile() {
    return babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    })
}

function roll(name, format, outFile, usePlugins = [], exports = 'named') {
    return {
        input: path.join(srcFolder, name + '.js'),
        output: {
            format, exports,
            name: format === 'umd' ? name : undefined,
            file: path.join(dstFolder, outFile.replace(/\[name\]/g, name)),
            banner: `/* ${pkg.name} ${pkg.version} https://github.com/${pkg.repository} @license ${pkg.license} */`
        },
        plugins: usePlugins.map(func => func())
    }
}

const pluginsMin = [terser]
const pluginsMinES5 = [transpile, terser]

export default [
    roll('Tackle', 'esm', '[name].js'),
    roll('Tackle', 'cjs', '[name].cjs'),
    roll('Tackle', 'umd', '[name].min.js', pluginsMin),
    roll('Tackle', 'umd', '[name].min.legacy.js', pluginsMinES5),
    roll('TkArray', 'umd', '[name].min.js', pluginsMin),
    roll('TkArray', 'umd', '[name].min.legacy.js', pluginsMinES5),
    roll('TkString', 'umd', '[name].min.js', pluginsMin),
    roll('TkString', 'umd', '[name].min.legacy.js', pluginsMinES5),
    roll('TkObject', 'umd', '[name].min.js', pluginsMin),
    roll('TkObject', 'umd', '[name].min.legacy.js', pluginsMinES5),
    roll('TkFunction', 'umd', '[name].min.js', pluginsMin),
    roll('TkFunction', 'umd', '[name].min.legacy.js', pluginsMinES5),
    roll('TkService', 'umd', '[name].min.js', pluginsMin),
    roll('TkService', 'umd', '[name].min.legacy.js', pluginsMinES5)
]