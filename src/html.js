"use strict"
/**
 * Utilities to manipulate HTML element from javascript.
 *
 * Those may not be feature complete, as this library purpose is to ease
 * cosmic-lib and Stellar Authenticator development, rather than provide a
 * generic-case toolbox.
 *
 * @exports html
 */

const { type } = require("@kisbox/utils")

/* Construct  */

/**
 * Return a newly created HTML element whose tag is `name`, attributes
 * `attributes` and childs `childs`.
 *
 * @example
 * // Long form
 * html("span", {}, "Hello, World!")
 * // Short form
 * html("span", ["Hello, World!"])
 *
 * @param {String} name
 * @param {Object|String} [attributes|className|ID]
 * @param {HTMLElement|Array<HTMLElement>} [childs]
 */
function html (name, attributes, childs) {
  const element = document.createElement(name)

  if (type.isArrayLike(attributes)) {
    childs = attributes
  } else if (type(attributes) === "object") {
    Object.assign(element, attributes)
  }

  html.append(element, childs)

  return element
}

/**
 * If **any** is not an *HTMLElement*, convert it to a text DOM node; else
 * return **any**.
 *
 * @param  {Any} any
 * @return {HTMLELement}
 */
html.convert = function (any) {
  if (html.isDomNode(any)) {
    return any
  } else if (any == null) {
    return document.createTextNode("")
  } else {
    return any.domNode || document.createTextNode(any)
  }
}

html.isDomNode = function (any) {
  // https://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object/36894871#36894871
  return (
    any instanceof Element || any instanceof HTMLDocument || any instanceof Text
  )
}

/* Tree management */

/**
 * Return the first element matching `pattern`.
 * If `name` starts with `#`, it will match against IDs.
 * If `name` starts with `.`, it will match against classes.
 * If `name` is a plain word, it will match against tags.
 * If `parent` is given, it will look recursively in `parent` childs.
 *
 * @param {String} pattern
 * @param {HTMLElement} [parent=document]
 * */
html.grab = function (pattern, parent = document) {
  return parent.querySelector(pattern)
}

/**
 * Replace `element` by `content`.
 *
 * @param {HTMLElement} element - The HTML element to replace.
 * @param {Any} content - The content to put in place of **element**.
 * @return {HTMLElement} **content**, converted into an HTML element when
 * relevant.
 */
html.replace = function (element, content) {
  const domNode = html.convert(content)
  element.parentNode.replaceChild(domNode, element)
  return domNode
}

/**
 * Insert `content` before `element`.
 *
 * @param {HTMLElement} element - An HTML element.
 * @param {Any} content - The content to insert before **element**.
 */
html.insertBefore = function (element, content) {
  const domNode = html.convert(content)
  element.parentNode.insertBefore(domNode, element)
}

/**
 * Insert `content` after `element`.
 *
 * @param {HTMLElement} element - An HTML element.
 * @param {Any} content - The content to insert after **element**.
 */
html.insertAfter = function (element, content) {
  if (element.nextSibling) {
    html.insertBefore(element.nextSibling, content)
  } else {
    html.append(element.parentNode, content)
  }
}

/**
 * Set the content of element to ...childs. Any previous content will be erased.
 *
 * @param {HTMLElement} element
 * @param {Array<HTMLElement>} [childs]
 */
html.rewrite = function (element, childs) {
  html.clear(element)
  html.append(element, childs)
}

/**
 * Append `childs` as the end of `element`.
 *
 * @param {HTMLElement} parent
 * @param {HTMLElelement|Array<HTMLElement>} [childs]
 */
html.append = function (parent, childs) {
  html.each(childs, child => parent.appendChild(child))
}

/**
 * Remove everything inside `element`.
 *
 * @param {HTMLElement} ...elements
 * */
html.clear = function (...elements) {
  html.each(elements, element => element.innerHTML = "")
}

/**
 * Destroy `element`.
 *
 * @param {HTMLElement} ...elements
 * */
html.remove = function (...elements) {
  html.each(elements, element => {
    try {
      element.parentNode.removeChild(element)
    } catch (error) {
      console.error(error)
    }
  })
}

/**
 * Destroy `element`.
 *
 * @param {HTMLElement|Array<HTMLElement>} elements
 * */
html.destroy = function (...elements) {
  html.each(elements, element => {
    html.clear(element)
    html.remove(element)
  })
}

/* Attributes Management */

/** Set the `style.display` property of `...elements` to `none`.
 *
 * @param {HTMLElement|Array<HTMLElement>} elements
 */
html.hide = function (...elements) {
  html.each(elements, element => element.hidden = true)
}

/**
 * Set the `style.display` property of `...elements` to `block`.
 *
 * @param {HTMLElement|Array<HTMLElement>} elements
 */
html.show = function (...elements) {
  html.each(elements, element => element.hidden = false)
}

/* Iteration */

html.each = function (elements, callback) {
  if (type.isArrayLike(elements)) {
    const array = Array.isArray(elements) ? elements : Array.from(elements)
    array.forEach(element => callback(html.convert(element)))
  } else {
    callback(html.convert(elements))
  }
}

/* Utilities */

/**
 * Add **style** as additional CSS rules for the current document.
 *
 * @param {String} style - CSS definitions
 */
html.addStyle = function (style) {
  const styleNode = html("style", { type: "text/css" }, style)
  html.append(document.head, styleNode)
}

/**
 * Copy text inside `element`. `element` should be a textbox like textarea or
 * text input.
 *
 * @param {HTMLElement} element
 * @param
 * */
html.copyContent = function (element) {
  // Don't copy complete box content twice / when user made a selection.
  if (element.selectionStart !== element.selectionEnd) return

  if (element.select) {
    element.select()
  } else if (window.getSelection) {
    const range = document.createRange()
    range.selectNode(element)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
  } else {
    return
  }
  return document.execCommand("copy")
}

/**
 * Copy **string** into user clipboard.
 *
 * @param {String} string
 */
html.copyString = function (string) {
  const textBox = html("textarea", null, string)
  html.append(document.body, textBox)
  html.copyContent(textBox)
  html.destroy(textBox)
}

/* Export */
module.exports = html
