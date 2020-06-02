"use strict"
/**
 * View custom attributes (`<tag $attribute="x">`)
 * */

const { $memoizer } = require("@kisbox/helpers")

const html = require("./html")

/* Extension */
const attributes = {}

// $ref="key"
attributes.ref = function (view, domNode, value) {
  view.$ref[value] = domNode
}

// $label="Text"
attributes.label = function (view, domNode, value) {
  if (domNode.type === "checkbox" || domNode.type === "radio") {
    const label = html("label", { onclick: () => domNode.click() }, value)
    html.insertAfter(domNode, label)
  } else {
    const label = html("label", null, html("span", null, value))
    html.insertAfter(domNode, label)
    html.append(label, domNode)
  }
}

// $group="network"
attributes.group = function (view, domNode, value) {
  $groups.add(view, value, domNode)
  domNode.onchange = () => view[value] = domNode.value
}

/* Helpers: $group */

const $groups = $memoizer("/groups/")

$groups.get = function (view, name) {
  const groups = $groups(view)
  if (groups[name]) return groups[name]

  const group = groups[name] = { name: uniqueName(name), members: [] }

  view.$on(name, (value) => {
    // Unchecking previous radio prevents same-frame changes to lead to
    // an inconsistent display.
    const previous = group.members.find((m) => m.checked)
    if (previous) previous.checked = false
    const selected = group.members.find((m) => m.value === value)
    selected.checked = true
  })

  return group
}

$groups.add = function (view, name, domNode) {
  const group = $groups.get(view, name)
  group.members.push(domNode)
  domNode.name = group.name
}

/* Helpers */

function uniqueName (name = "group") {
  uniqueName.counter++
  return `[${name}:${uniqueName.counter}]`
}
uniqueName.counter = 0

/* Exports */
module.exports = attributes
