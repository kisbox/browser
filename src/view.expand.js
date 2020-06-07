"use strict"
/**
 * View.expand
 * */

/* Library */

/**
 * Replaces **template** variables by equivalent `<template>` tags.
 */
function expand (template) {
  const stripped = template.replace(/^[\s\n]*/, "").replace(/[\s\n]*$/, "")
  return (
    stripped
      // Firefox fix (prefix on[event] with a dot).
      .replace(/\s(on\w+)=(%\w+)/g, " .$1=$2")
      // Apply only on content outside of HTML tags.
      .replace(/(^|>)[^<>]*(<|$)/g, (string) =>
        string

          // %function:...identifier / %{function:...identifier}
          .replace(/(^|[^\\])%{?(\w+):\.\.\.(\w+)}?/g, ellipsis)
          .replace(/(^|[^\\])%{?(\w+):\.\.\.(\w+)}?/g, ellipsis)

          // %function:identifier /  %{function:identifier}
          .replace(/(^|[^\\])%{?(\w+):(\w+)}?/g, variable)
          .replace(/(^|[^\\])%{?(\w+):(\w+)}?/g, variable)

          // ...%identifier / ...${identifier}
          .replace(/()\.\.\.%{?()(\w+)}?/g, ellipsis)
          .replace(/()\.\.\.%{?()(\w+)}?/g, ellipsis)

          // %identifier / ${identifier}
          .replace(/(^|[^\\])%\{?()(\w+)\}?/g, variable)
          .replace(/(^|[^\\])%\{?()(\w+)\}?/g, variable)

          // \%...
          .replace(/(^|[^\\])\\%/g, "$1%")
      )
  )
}

/* Helpers */

function ellipsis (_, prevchar, func, identifier) {
  return `${prevchar}<template data-type="ellipsis" data-func="${func}">${identifier}</template>`
}

function variable (_, prevchar, func, identifier) {
  return `${prevchar}<template data-type="variable" data-func="${func}">${identifier}</template>`
}

/* Export */
module.exports = expand
