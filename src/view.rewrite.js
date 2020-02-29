"use strict"
/**
 * View.rewrite
 *
 * Bind a templateNode to a view.
 **/
const {
  function: { dispatch }
} = require("@kisbox/helpers")

const html = require("./html")
const linkAttribute = require("./lib/link-attribute")

/* Utility */

function rewrite (view, domNode) {
  if (domNode.nodeName === "TEMPLATE") {
    rewrite.template(view, domNode)
  } else if (domNode.attributes) {
    Object.values(domNode.attributes).forEach(attribute => {
      rewrite.attribute(view, domNode, attribute)
    })
  }

  domNode.childNodes.forEach(child => {
    rewrite(view, child)
  })
}

rewrite.attribute = function (view, domNode, attribute) {
  if (attribute.name[0] === "$") {
    // $customAttribute
    const name = attribute.name.substr(1)
    dispatch(view.constructor.attributes, name, rule => {
      rule(view, domNode, attribute.value)
    })
  } else if (attribute.name.match(/^%{?\w+}?$/)) {
    // %attribute / %{attribute}
    const key = attribute.name.substr(1)
    linkAttribute(domNode, key, view)
    domNode.attributes.removeNamedItem(attribute.name)
  } else if (attribute.value.match(/^%{?\w+:\w+}?$/)) {
    // attribute=%func:key / attribute=%{func:key}
    const domKey = attribute.name
    const [funcKey, key] = attribute.value.substr(1).split(":")
    const func = extractHelper(view, funcKey)
    linkAttribute(domNode, domKey, view, key, func)
  } else if (attribute.value.match(/^%{?\w+}?$/)) {
    // attribute=%key / attribute = %{key}
    const domKey = attribute.name
    const key = attribute.value.substr(1)
    linkAttribute(domNode, domKey, view, key)
  }
}

rewrite.template = function (view, domNode) {
  if (domNode.dataset.type === "variable") {
    rewrite.variable(view, domNode)
  } else if (domNode.dataset.type === "ellipsis") {
    rewrite.ellipsis(view, domNode)
  }
}

rewrite.variable = function (view, domNode) {
  let currentNode = domNode

  const { key, func } = extractTemplateValues(view, domNode)
  const push = func
    ? value => currentNode = html.replace(currentNode, func(value))
    : value => currentNode = html.replace(currentNode, value)

  view.$on(key, push)
}

rewrite.ellipsis = function (view, domNode) {
  const { key, func } = extractTemplateValues(view, domNode)

  // TODO: keep domNode instead?
  const anchor = html.convert("")
  html.replace(domNode, anchor)

  let ellipsis = []
  const update = array => ellipsis = updateEllipsis(anchor, ellipsis, array)

  // TODO: fix memory management
  let liveMap
  const rebind = function (array, previous) {
    // Unbind previous array.
    if (liveMap) {
      liveMap.$destroy()
      liveMap = null
    } else if (previous && typeof previous.$off === "function") {
      previous.$off("$change", update)
    }

    const isLiveArray = array && typeof array.$map === "function"

    // Pass items through `func`.
    if (func) {
      if (isLiveArray) {
        liveMap = array.$map(func)
        array = liveMap
      } else {
        array = array.map(func)
      }
    }

    // Bind new array.
    if (isLiveArray) array.$on("$change", update)
    update(array)
  }

  view.$on(key, rebind)
}

/* Helpers */

function updateEllipsis (anchor, oldNodes, array = []) {
  const parent = anchor.parentNode
  oldNodes.forEach(node => {
    if (node.parentNode === parent) {
      parent.removeChild(node)
    }
  })

  const ellipsis = []
  html.each(array, child => {
    ellipsis.push(child)
    parent.insertBefore(child, anchor)
  })

  return ellipsis
}

function extractTemplateValues (view, domNode) {
  const key = domNode.innerHTML
  const funcKey = domNode.dataset.func
  const func = funcKey && extractHelper(view, funcKey)
  return { key, func }
}

function extractHelper (view, key) {
  const helpers = view.constructor.helpers
  if (helpers[key]) {
    return helpers[key].bind(view)
  } else {
    throw new Error(`Undefined helper: ${key}`)
  }
}

/* Exports */
module.exports = rewrite
