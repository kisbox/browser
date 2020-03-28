"use strict"
/**
 * View custom attributes (`<tag $attribute="x">`)
 * */

// const {
//   $meta: { $memoizer }
// } = require("@kisbox/helpers")

const html = require("./html")

/* Extension */
const attributes = {}

// $ref="key"
attributes.ref = function (view, domNode, value) {
  view.$ref[value] = domNode
}

// $label="Text"
attributes.label = function (view, domNode, value) {
  const label = html(
    "label",
    { for: domNode, onclick: () => domNode.click() },
    html("span", null, value)
  )

  html.insertAfter(domNode, label)
  if (domNode.type !== "checkbox" && domNode.type !== "radio") {
    html.append(label, domNode)
  }
}

// // $group="network"
// attributes.group = function (view, domNode, value) {
//   // Init or get private group.
//   const groups = $groups(view)
//   if (!groups[value]) {
//     groups[value] = { name: uniqueName(value), members: [] }
//   }
//   const group = groups[value]

//   // Add **domNode**.
//   group.members.push(domNode)
//   domNode.group = group
//   domNode.name = group.name
//   domNode.onchange = groupEvent
// }

// const $groups = $memoizer()

// /* Helpers */

// function uniqueName (name = "group") {
//   uniqueName.counter++
//   return `/${group}.${counter}/`
// }
// uniqueName.counter = 0

/* Exports */
module.exports = attributes
