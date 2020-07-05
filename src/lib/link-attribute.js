"use strict"
/**
 * DomNode<->LiveObject bindings
 *
 * TODO: clean attributes
 * TODO: complete binding?
 */

const { dispatch, timeout } = require("@kisbox/helpers")
const { type } = require("@kisbox/utils")

/* Library */

function linkAttribute (domNode, attribute, object, key = attribute, transform) {
  // Sugars
  if (attribute === "class") attribute = "className"
  else if (attribute === "readonly") attribute = "readOnly"
  else if (attribute === "for") attribute = "htmlFor"
  else if (attribute === "selectedIndex") attribute = "selectedIndex"
  else if (attribute === "style") object[key] = domNode.style

  // Firefox work-around.
  if (attribute.substr(0, 3) === ".on") attribute = attribute.substr(1)

  if (attribute.substr(0, 2) === "on") {
    domNode[attribute] = (event) => handleEvent(object, key, event)
  } else {
    linkValue(domNode, attribute, object, key, transform)
  }
}

function handleEvent (object, key, event) {
  setTimeout(() => object[key](event), 1)
}

function linkValue (domNode, attribute, object, key, transform) {
  object.$push(key, domNode, attribute, maybeBind(transform))

  if (!object[key]) {
    object[key] = domNode[attribute]
  }

  dispatch(rules, domNode.tagName, (binder) => {
    binder(domNode, attribute, object, key)
  })
}

/* Rules: TagName */
const rules = {}

rules.INPUT = function (domNode, attribute, object, key) {
  if (domNode.type === "radio") {
    rules.radio(...arguments)
  } else if (domNode.type === "checkbox") {
    rules.checkbox(...arguments)
  } else if (attribute === "value") {
    pullOn("input", object, domNode, key, attribute)
  }
}

rules.TEXTAREA = function (domNode, attribute, object, key) {
  if (attribute === "value") {
    pullOn("input", object, domNode, key, attribute)
  }
}

rules.SELECT = function (domNode, attribute, object, key) {
  if (rules.SELECT.dynamic.includes(attribute)) {
    pullOn("change", object, domNode, key, attribute)
  }
}
rules.SELECT.dynamic = ["selectedIndex", "selectedOptions", "value"]

/* Rules: type */

rules.radio = function (domNode, attribute, object, key) {
  if (attribute !== "checked") return

  const callback = () => {
    if (domNode.checked) object[key] = domNode.value
  }

  domNode.addEventListener("change", callback)
  callback()
}

rules.checkbox = function (domNode, attribute, object, key) {
  if (attribute !== "checked") return

  pullOn("change", object, domNode, key, attribute)
}

/* Helpers */

function pullOn (eventName, object, domNode, key, attribute) {
  if (eventName === "input") {
    let stamp
    domNode.addEventListener(eventName, () => {
      const current = stamp = +new Date()
      timeout(1000).then(() => {
        if (stamp === current) {
          object[key] = htmlToJs(domNode[attribute])
          domNode.setCustomValidity("")
        }
      })
    })
    domNode.addEventListener("keydown", (event) => {
      if (event.keyCode !== 13) return
      object[key] = htmlToJs(domNode[attribute])
      domNode.setCustomValidity("")
    })
    domNode.addEventListener("blur", () => {
      object[key] = htmlToJs(domNode[attribute])
      domNode.setCustomValidity("")
    })
  } else {
    domNode.addEventListener(eventName, () => {
      object[key] = htmlToJs(domNode[attribute])
      domNode.setCustomValidity("")
    })
  }
}

function maybeBind (func, context) {
  if (func) {
    const binded = func.bind(context)
    return (x) => jsToHtml(binded(x))
  } else {
    return jsToHtml
  }
}

function jsToHtml (value) {
  if (value == null) {
    return ""
  } else if (type(value) === "promise") {
    return "Pending..."
  } else {
    return value
  }
}

function htmlToJs (value) {
  return value === "" ? null : value
}

/* Exports */
module.exports = linkAttribute
