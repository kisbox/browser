"use strict"
/**
 * Component-driven GUI Development
 *
 * API:
 *
 * Reference: $ref=alias
 * Group:     $group=%alias
 * Label:     $label="text"
 *
 * Attribute: %attr | attr=%alias | attr=%func:alias
 * Content: %alias | %func:alias | %{alias} | %{func:alias}
 *          %...alias | %func:...alias | %{...alias} | %{func:...alias}
 * Escape: \%example | \%{example}
 */

const { LiveObject } = require("@kisbox/model")

const {
  $meta: { $sideScope },
  constructor: { shortcuts },
  property: { lock }
} = require("@kisbox/helpers")

const html = require("./html")

const $attributes = $sideScope("/attributes/")
const $helpers = $sideScope("/helpers/")

/* Class */

class View extends LiveObject {
  constructor (template = "", params) {
    super()

    const tree = html("template", { innerHTML: View.expand(template) })
    const content = tree.content

    if (
      !content.childNodes.length
      || content.childNodes.length > 1
      || content.childNodes[0].tagName === "TEMPLATE"
    ) {
      this.domNode = html("div", null, content.childNodes)
    } else {
      this.domNode = content.childNodes[0]
    }
    lock(this, "domNode")

    View.rewrite(this, this.domNode)

    // Import parameters.
    if (params) {
      const keys = Object.keys(this)
      const keysFiltered = keys.filter(key => key !== "style")
      this.$import(keysFiltered, params)

      if ("style" in keys) {
        Object.assign(this.style, params.style)
      }
    }
  }

  /* Tree management */
  $ref (pattern) {
    return html.grab(pattern, this.domNode)
  }

  $mount (target = "body") {
    const parent = target ? html.grab(target) : document.body
    if (!parent) {
      throw new Error(`Can't find target: "${target}"`)
    }
    html.rewrite(parent, this)
  }

  $show () {
    html.show(this)
  }

  $hide () {
    html.hide(this)
  }

  /* Customizables */
  static get attributes () {
    return $attributes(this)
  }

  static get helpers () {
    return $helpers(this)
  }
}

const { proto } = shortcuts(View)

proto.$on("$destroy", function () {
  html.destroy(this)
})

/* Utilities */
View.expand = require("./view.expand")
View.rewrite = require("./view.rewrite")

/* Customizables */
Object.assign(View.attributes, require("./view.attributes"))
Object.assign(View.helpers, require("./view.helpers"))

/* Exports */
module.exports = View
