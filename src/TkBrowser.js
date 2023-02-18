import { setParamsURL } from './TkService.js'

/**
 * @typedef {{[key:string]:any}} TObjectJS  Type of object JS
 */

/**
 * Creates an HTML element
 * @param {string} tagName                  Type of element to be created
 * @param {HTMLElement} elParent            Parent HTML element (page root: document.body)
 * @param {object} [options]                Options
 * @param {boolean} [options.insertFirst]   Add an element as first of the children nodes of parent (default: false → add as last)
 * @param {TObjectJS[]} [options.subElements]               Entries of elements to recursively create as children (default: empty)
 * @param {Object<string,string>} [options.attributes]      Keys/values of attributes who sets to the element (default: empty)
 * @param {string|Object<string,string>} [options.style]    Keys/values/cssText of the style to be set for the element (default: empty)
 * @param {string|string[]} [options.class]                 Class/Classes to be set for the element (default: empty)
 * @param {Object<string,string>} [options.properties]      Keys/values of exist properties to be set for the element (default: empty)
 * @returns {HTMLElement}
 */
export function createHTMLElement(tagName, elParent, options = {}) {
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
                    propVal.forEach((rec) => element.classList.add(rec))
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
 * Set resize handler for div HTML element
 * @param {HTMLElement} elDiv               Div HTML element
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
 * Implementation HTTP request
 * @param {string} url                      Url of request
 *
 * @param {object} [options]                                    Options
 * @param {'GET'|'POST'} [options.method]                       Method of request (default: 'GET')
 * @param {XMLHttpRequestResponseType} [options.responseType]   Expected response type (default: 'arraybuffer')
 * @param {TObjectJS} [options.params]                          Params of request. In case of a GET-request, this converted to url search params by TkService.setParamsURL → parsing on server by TkService.getParamsURL (default: empty)
 * @param {Object<string,string>} [options.headers]             Headers of request (default: empty)
 *
 * @param {string} [options.id]             Id of request. Used in callbacks of request events (default: null)
 * @param {number} [options.timeout]        Timeout of request (default: 10000)
 * @param {boolean} [options.useCache]      Use request cached by browser (default: true)
 * @param {boolean} [options.useReject]     Use promise rejection on failure of request (default: false → resolve null)
 * @param {boolean} [options.delSearchMark] Delete search mark ('?') from url (default: false)
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
        delSearchMark: false,

        cbLoad: (response, requestId) => {},
        cbError: (status, requestId) => {},
        cbFinal: (status, response, requestId) => {},
        cbProgress: (loaded, total, requestId) => {},

        ...options
    }

    const addUrl = useOptions.delSearchMark
        ? '/' + setParamsURL(self.location.href, options.params).searchParams.toString()
        : ''

    let useUrl

    try {
        useUrl = new URL(url + addUrl)
    } catch {
        const baseUrl = new URL(self.location.href).origin
        useUrl = new URL(url + addUrl, baseUrl)
    }

    if (!useOptions.delSearchMark && (useOptions.method === 'GET')) setParamsURL(useUrl, options.params)
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

        const sendData = JSON.stringify(useOptions.method === 'POST' ? useOptions.params : {})
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

    createHTMLElement('a', self.document.body, {
        properties: {
            type: 'text/json',
            download: fileName,
            href: url
        }
    }).click()
}

export default { createHTMLElement, getSizeHTMLElement, setDivResizer, interceptErrors, httpRequest, saveValAsJson }