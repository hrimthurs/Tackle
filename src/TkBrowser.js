/**
 * Creates an HTML element
 * @param {string} tagName                  Type of element to be created
 * @param {HTMLElement} elParent            Parent HTML element (page root: document.body)
 * @param {object} [options]
 * @param {boolean} [options.insertFirst]   Add an element as first of the children nodes of parent (default: false → add as last)
 * @param {object[]} [options.subElements]  Entries of elements to recursively create as children (default: empty)
 * @param {Object<string,string>} [options.attributes]      Keys/values of attributes who sets to the element (default: empty)
 * @param {string|Object<string,string>} [options.style]    Keys/values (or cssText) of the style to be set for the element (default: empty)
 * @param {string|string[]} [options.class]                 Class/Classes to be set for the element (default: empty)
 * @param {Object<string,string>} [options.properties]      Keys/values of properties to be set for the element (default: empty)
 * @returns {HTMLElement}
 */
export function createHTMLElement(tagName, elParent, options = {}) {
    const element = document.createElement(tagName)

    let insertFirst = options.insertFirst ?? false
    let subElements = options.subElements ?? []

    Object.entries(options).forEach((recProperty) => {
        const [propName, propVal] = recProperty

        const isValArray = Array.isArray(propVal)
        const isValString = typeof propVal === 'string'
        const isValObject = typeof propVal === 'object'

        switch (propName) {
            case 'attributes':
                if (isValObject) {
                    Object.entries(propVal).forEach((rec) => {
                        element.setAttribute(rec[0], rec[1])
                    })
                }
            break

            case 'style':
                const currCssText = element.style.cssText ?? ''

                if (isValObject) {
                    Object.entries(propVal).forEach((rec) => {
                        element.style.cssText = currCssText + `;${rec[0]}:${rec[1]}`
                    })
                } else if (isValString) {
                    element.style.cssText = currCssText + `;${propVal}`
                }
            break

            case 'class':
                if (isValArray) {
                    propVal.forEach((rec) => {
                        element.classList.add(rec)
                    })
                } else if (isValString) {
                    element.classList.add(propVal)
                }
            break

            case 'properties':
                if (isValObject) {
                    Object.entries(propVal).forEach((rec) => {
                        if (rec[0] in element) element[rec[0]] = rec[1]
                    })
                }
            break
        }
    })

    if (insertFirst) elParent.insertBefore(element, elParent.firstChild)
    else elParent.appendChild(element)

    subElements.forEach((subEl) => {
        const tagName = subEl.tagName
        delete subEl.tagName
        createHTMLElement(tagName, element, subEl)
    })

    return element
}

/**
 * Set resize handler for div HTML element
 * @param {HTMLDivElement} elDiv            Div HTML element
 * @param {function({width:number,height:number}):void} handler Handler function
 */
export function setDivResizer(elDiv, handler) {
    const elResizer = createHTMLElement('iframe', elDiv, {
        style: 'position:absolute; left:0px; top:0px; width:100%; height:100%; z-index:-10000',
        attributes: { frameborder: 'no' }
    })

    const contentWindow = elResizer['contentWindow']

    let prevSize = {
        width: null,
        height: null
    }

    contentWindow.addEventListener('resize', () => {
        let { width, height } = getComputedStyle(elResizer)

        const newSize = {
            width: parseInt(width, 10) + 1,
            height: parseInt(height, 10) + 1
        }

        if ((prevSize.width !== newSize.width) || (prevSize.height !== newSize.height)) {
            handler(newSize)
            prevSize = newSize
        }
    })

    contentWindow.dispatchEvent(new Event('resize'))
}

/**
 * Intercepting on page "error" and "unhandledrejection" events
 * @param {function(string):void} handler   Callback with error message on errors events
 * @param {boolean} [preventDefault]        Prevent default errors events (default: true)
 */
export function interceptErrors(handler, preventDefault = true) {
    window.addEventListener('error', (event) => {
        if (preventDefault) event.preventDefault()
        handler(event.message)
    })

    window.addEventListener('unhandledrejection', (event) => {
        if (preventDefault) event.preventDefault()
        handler(event.reason ?? 'Unknown reason rejection')
    })
}

export default { createHTMLElement, setDivResizer, interceptErrors }