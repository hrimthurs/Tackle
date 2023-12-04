import { setParamsURL } from './TkService.js'
import { getArray } from './TkArray.js'

/**
 * Creates an HTML element
 * @param {string} tagName                  Type of element to be created
 * @param {object} [options]                Options
 * @param {boolean} [options.insertFirst]   Add an element as first of the children nodes of parent (default: false → add as last)
 * @param {object[]} [options.subElements]                  Entries of elements to recursively create as children (default: empty)
 * @param {Object<string,string>} [options.attributes]      Keys/values of attributes who sets to the element (default: empty)
 * @param {string|Object<string,string>} [options.style]    Keys/values/cssText of the style to be set for the element (default: empty)
 * @param {string|string[]} [options.class]                 Class/Classes to be set for the element (default: empty)
 * @param {Object<string,string>} [options.properties]      Keys/values of exist properties to be set for the element (default: empty)
 * @param {HTMLElement} [elParent]          Parent HTML element (default: empty). Page root: document.body
 * @returns {HTMLElement}
 */
export function createHTMLElement(tagName, options = {}, elParent = null) {
    const element = self.document.createElement(tagName)

    const insertFirst = options.insertFirst ?? false
    const subElements = options.subElements ?? []

    Object.entries(options).forEach((recProperty) => {
        const [propName, propVal] = recProperty

        const isValArray = Array.isArray(propVal)
        const isValString = typeof propVal === 'string'
        const isValObject = typeof propVal === 'object'

        switch (propName) {
            case 'attributes':
                if (isValObject) {
                    Object.entries(propVal).forEach(([name, val]) => {
                        element.setAttribute(name, val)
                    })
                }
            break

            case 'style':
                const currCssText = element.style.cssText ?? ''

                if (isValObject) {
                    Object.entries(propVal).forEach(([name, val]) => {
                        element.style.cssText = currCssText + `;${name}:${val}`
                    })
                } else if (isValString) {
                    element.style.cssText = currCssText + `;${propVal}`
                }
            break

            case 'class':
                if (isValArray) {
                    propVal.forEach((rec) => element.classList.add(rec))
                } else if (isValString) {
                    element.classList.add(propVal)
                }
            break

            case 'properties':
                if (isValObject) {
                    Object.entries(propVal).forEach(([name, val]) => {
                        if (name in element) element[name] = val
                    })
                }
            break
        }
    })

    if (elParent) {
        if (insertFirst) elParent.insertBefore(element, elParent.firstChild)
        else elParent.appendChild(element)
    }

    subElements.forEach((subEl) => {
        const tagName = subEl.tagName
        delete subEl.tagName
        createHTMLElement(tagName, subEl, element)
    })

    return element
}

/**
 * Returns real computed size of HTML element
 * @param {HTMLElement} element             HTML element
 * @returns {{width:number,height:number}}  Size of element
 */
export function getSizeHTMLElement(element) {
    const { width, height } = getComputedStyle(element)

    return {
        width: parseInt(width, 10) + 1,
        height: parseInt(height, 10) + 1
    }
}

/**
 * Sets/unsets/toggles classes for each element by selector
 * @param {string} selectorElement          Query selector of target elements
 * @param {object} [options]                Options
 * @param {string|string[]} [options.set]   Class/classes name for set to each elements (default: empty)
 * @param {string|string[]} [options.unset] Class/classes name for unset to each elements (default: empty)
 * @param {string|string[]} [options.toggle] Class/classes name for toggle to each elements (default: empty)
 */
export function applyClasses(selectorElement, options) {
    const setClasses = getArray(options.set)
    const unsetClasses = getArray(options.unset)
    const toggleClasses = getArray(options.toggle)

    forEachElement(selectorElement, (el) => {
        setClasses.forEach((name) => el.classList.add(name))
        unsetClasses.forEach((name) => el.classList.remove(name))
        toggleClasses.forEach((name) => el.classList.toggle(name))
    })
}

/**
 * Run callback for each element by selector
 * @param {string} selectorElement          Query selector of target elements
 * @param {function(any):void} callback     Callback function
 */
export function forEachElement(selectorElement, callback) {
    document.querySelectorAll(selectorElement).forEach((el) => callback(el))
}

/**
 * Set resize handler for div HTML element
 * @param {HTMLElement} elDiv               Div HTML element
 * @param {function({width:number,height:number}):void} handler Handler function
 */
export function setDivResizer(elDiv, handler) {
    const elResizer = createHTMLElement('iframe', {
        style: 'position:absolute; left:0px; top:0px; width:100%; height:100%; z-index:-10000',
        attributes: { frameborder: 'no' }
    }, elDiv)

    const contentWindow = elResizer['contentWindow']

    let prevSize = {
        width: null,
        height: null
    }

    contentWindow.addEventListener('resize', () => {
        const newSize = getSizeHTMLElement(elResizer)

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

/**
 * Wait for document complete
 * @param {function():void} [callback]      Callback on document complete
 * @returns {Promise}
 */
export function onDocumentComplete(callback = () => {}) {
    return new Promise((resolve) => {
        const complete = () => {
            callback()
            resolve(true)
        }

        if (document.readyState !== 'complete') {
            document.addEventListener('readystatechange', () => {
                if (document.readyState === 'complete') complete()
            })
        } else complete()
    })
}

/**
 * Implementation HTTP request
 * @param {string} url                      Url of request
 *
 * @param {object} [options]                                    Options
 * @param {'GET'|'POST'} [options.method]                       Method of request (default: 'GET')
 * @param {XMLHttpRequestResponseType} [options.responseType]   Expected response type (default: 'arraybuffer')
 * @param {object} [options.params]                             Params of request. In case of a GET-request, this converted to url search params by TkService.setParamsURL → parsing on server by TkService.getParamsURL (default: empty)
 * @param {Object<string,string>} [options.headers]             Headers of request (default: empty)
 *
 * @param {string} [options.id]                 Id of request. Used in callbacks of request events (default: null)
 * @param {number} [options.timeout]            Timeout of request (default: 10000)
 * @param {boolean} [options.useCache]          Use request cached by browser (default: true)
 * @param {boolean} [options.useReject]         Use promise rejection on failure of request (default: false → resolve null)
 * @param {boolean} [options.setGetAsFolder]    For GET request set parameters to query string as path to folder (default: false)
 * @param {boolean} [options.addPostQString]    For POST request set body parameters to query string (default: false)
 *
 * @param {function(any,string):void} [options.cbLoad]          Callback on successful completion of the request (default: empty)
 *      - arg0 - response body
 *      - arg1 - request id
 * @param {function(number,string):void} [options.cbError]      Callback on failure of the request (default: empty)
 *      - arg0 - error status
 *      - arg1 - request id
 * @param {function(number,any,string):void} [options.cbFinal]  Callback on completion of the request (default: empty)
 *      - arg0 - request status
 *      - arg1 - response body
 *      - arg2 - request id
 * @param {function(number,number,string):void} [options.cbProgress] Callback on progress of the request (default: empty)
 *      - arg0 - bytes loaded
 *      - arg1 - bytes total
 *      - arg2 - request id
 * @returns {Promise}
 */
export function httpRequest(url, options = {}) {
    const useOptions = {
        method: 'GET',

        /** @type {XMLHttpRequestResponseType} */
        responseType: 'arraybuffer',

        params: {},
        headers: {},

        id: null,
        timeout: 10000,

        useCache: true,
        useReject: false,

        setGetAsFolder: false,
        addPostQString: false,

        cbLoad: (response, requestId) => {},
        cbError: (status, requestId) => {},
        cbFinal: (status, response, requestId) => {},
        cbProgress: (loaded, total, requestId) => {},

        ...options
    }

    const isMethodGET = useOptions.method === 'GET'
    const isMethodPOST = useOptions.method === 'POST'

    let isSetParamsUrl = isMethodGET || (isMethodPOST && useOptions.addPostQString)

    if (isMethodGET && useOptions.setGetAsFolder) {
        url += setParamsURL(self.location.href, options.params).searchParams.toString()
        isSetParamsUrl = false
    }

    let useUrl

    try {
        useUrl = new URL(url)
    } catch {
        const baseUrl = new URL(self.location.href).origin
        useUrl = new URL(url, baseUrl)
    }

    if (isSetParamsUrl) setParamsURL(useUrl, options.params)
    if (!useOptions.useCache) useUrl.searchParams.set('r', Math.random().toString())

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(useOptions.method, useUrl, true)
        xhr.responseType = useOptions.responseType
        xhr.timeout = useOptions.timeout

        for (let name in useOptions.headers) {
            xhr.setRequestHeader(name,  useOptions.headers[name])
        }

        xhr.onloadend = () => {
            const isError = (xhr.status !== 200) || ((useOptions.responseType === 'arraybuffer') && (xhr.response.byteLength === 0))

            if (isError) {
                useOptions.cbError(xhr.status, useOptions.id)
                if (useOptions.useReject) reject(xhr.status)
                else resolve(null)
            } else {
                useOptions.cbLoad(xhr.response, useOptions.id)
                resolve(xhr.response)
            }

            useOptions.cbFinal(xhr.status, xhr.response, useOptions.id)
        }

        xhr.onprogress = (event) => {
            useOptions.cbProgress(event.loaded, event.total, useOptions.id)
        }

        const sendData = JSON.stringify(isMethodPOST ? useOptions.params : {})
        xhr.send(sendData)
    })
}

/**
 * Saves the passed value in JSON format
 * @param {string} fileName                 Name of file
 * @param {any} value                       Value to save
 */
export function saveValAsJson(fileName, value) {
    const blob = new Blob([JSON.stringify(value, null, '\t')], { type: 'text/json' })
    const url = URL.createObjectURL(blob)

    setTimeout(() => URL.revokeObjectURL(url), 10000)

    createHTMLElement('a', {
        properties: {
            type: 'text/json',
            download: fileName,
            href: url
        }
    }).click()
}

export default { createHTMLElement, getSizeHTMLElement, applyClasses, forEachElement, setDivResizer, interceptErrors, onDocumentComplete, httpRequest, saveValAsJson }