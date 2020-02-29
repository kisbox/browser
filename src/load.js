"use strict"
/**
 * Asynchronously load external ressources.
 *
 * @exports load
 */
const html = require("./html")

/* Library */

/**
 * Loads **resource** into the current web page.
 *
 * If **resource** resolves to an URL with a `.css` extension, it gets loaded as
 * a stylesheet. Else, it gets loaded as a script.
 *
 * @param {String} resource - Either a NPM package, a NPM package file, a
 * relative path or an absolute path
 */
function load (resource) {
  const url = load.resolve(resource)
  if (resource.slice(-4) === ".css") {
    return load.css(url)
  } else {
    return load.js(url)
  }
}

/**
 * Returns **resource** URL.
 *
 * @param {String} resource - Either relative path or an absolute path
 */
load.resolve = function (resource) {
  // Relative addressing.
  if (resource.substr(0, 2) === "./") {
    return resource.substr(2)
    // Absolute addressing.
  } else if (resource.match(/^http(s):\/\//)) {
    return resource
    // Aliases.
  }
}

/* Primitives */

/**
 * Asynchronously loads a script from **src**.
 *
 * @async
 * @param {String} src
 */
load.js = async function (src) {
  return new Promise(function (onload, onerror) {
    const scriptNode = html("script", { src, onload, onerror })
    html.append(document.head, scriptNode)
  })
}

/**
 * Asynchronously loads a stylesheet from **href**.
 *
 * @async
 * @param {String} href
 */
load.css = async function (href) {
  return new Promise(function (onload, onerror) {
    const linkNode = html("link", {
      rel: "stylesheet",
      type: "text/css",
      href,
      onload,
      onerror
    })
    html.append(document.head, linkNode)
  })
}

/* Export */
module.exports = load
