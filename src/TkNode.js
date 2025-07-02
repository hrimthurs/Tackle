import fs from 'node:fs'
import path from 'node:path'

/**
 * @typedef {import('node:path').ParsedPath} TParsedPath
 */

/**
 * Traversing files in folders
 * @param {string} root                     Root for traversing
 * @param {object} [options]                Options
 * @param {string[]} [options.include]      Array of patterns of files/folders to includes in traversing (default: empty → all traversing)
 * @param {string[]} [options.exclude]      Array of patterns of files/folders to excludes from traversing (default: empty → all traversing)
 * @param {boolean} [options.recursive]     Recursive traversing of folders (default: true)
 * @param {function(string,TParsedPath):void} [options.cbAction] Callback for every file (default: empty)
 *      - arg0 - full path of file
 *      - arg1 - parsed parts of path of file
 * @returns {string[]}                      Array of full pathes of all traversed files
 */
export function traverseFiles(root, options = {}) {
    const useOptions = {
        include: [],
        exclude: [],
        recursive: true,
        cbAction: (fullPath, parts) => {},
        ...options
    }

    return _traverseFiles(root, useOptions, [])
}

function _traverseFiles(parentDir, options, files) {
    fs.readdirSync(parentDir).forEach((name) => {
        const pathEntity = path.join(parentDir, name)
        const parts = path.parse(pathEntity)

        const isInclude = options.include.length > 0
            ? [pathEntity, parts.base, parts.name, parts.ext].some((check) => options.include.includes(check))
            : true

        const isExclude = options.exclude.length > 0
            ? [pathEntity, parts.base, parts.name, parts.ext].some((check) => options.exclude.includes(check))
            : false

        const isDirectory = fs.statSync(pathEntity).isDirectory()

        if (isDirectory && !isExclude && (options.recursive)) {
            _traverseFiles(pathEntity, options, files)
        } else if (isInclude && !isExclude) {
            files.push(pathEntity)
            options.cbAction(pathEntity, parts)
        }
    })

    return files
}

export default { traverseFiles }