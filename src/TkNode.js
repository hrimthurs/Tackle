const fs = require('fs')
const path = require('path')

/**
 * @typedef {import('node:path').ParsedPath} TParsedPath
 */

/**
 * Traversing files in folders
 * @param {object} options                  Options
 * @param {string} [options.root]           Root for traversing (default: './')
 * @param {string[]} [options.include]      Array of patterns of files/folders to includes in traversing (default: empty → all traversing)
 * @param {string[]} [options.exclude]      Array of patterns of files/folders to excludes from traversing (default: empty → all traversing)
 * @param {boolean} [options.recursive]     Recursive traversing of folders (default: true)
 * @param {function(string,TParsedPath):void} [options.cbAction] Callback for every file (default: empty)
 *      - arg0 - full path of file
 *      - arg1 - parsed parts of path of file
 * @returns {string[]}                      Array of full pathes of all traversed files
 */
function traverseFiles({ root = './', include = [], exclude = [], recursive = true, cbAction = (fullPath, parts) => {} }) {
    const useRoot = !path.isAbsolute(root)
        ? path.join(__dirname, root)
        : root

    return _traverseFiles({ include, exclude, recursive, cbAction }, useRoot, [])
}

function _traverseFiles(options, parentDir, files) {
    fs.readdirSync(parentDir).forEach((name) => {
        const pathEntity = path.join(parentDir, name)
        const parts = path.parse(pathEntity)

        const isInclude = options.include
            ? [pathEntity, parts.base, parts.name, parts.ext].some((check) => options.include.includes(check))
            : true

        const isExclude = options.exclude
            ? [pathEntity, parts.base, parts.name, parts.ext].some((check) => options.exclude.includes(check))
            : false

        const isDirectory = fs.statSync(pathEntity).isDirectory()

        if (isDirectory && !isExclude && (options.recursive)) {
            _traverseFiles(options, pathEntity, files)
        } else if (isInclude && !isExclude) {
            files.push(pathEntity)
            options.cbAction(pathEntity, parts)
        }
    })

    return files
}

export default { traverseFiles }