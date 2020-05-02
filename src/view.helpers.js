"use strict"
/**
 * View custom helpers
 * */

/* Extension */
const helpers = {}

/* Value */

helpers.not = function (any) {
  return !any || any instanceof Promise || any instanceof Error
}

helpers.has = function (any) {
  return any && !(any instanceof Promise) && !(any instanceof Error)
}

helpers.truthy = function (any) {
  return !!any && helpers.available(any)
}

helpers.available = function (any) {
  return !(any instanceof Promise) && !(any instanceof Error)
}

helpers.notAvailable = function (any) {
  return any instanceof Promise || any instanceof Error
}

/* States */

helpers.pending = function (any) {
  return any instanceof Promise
}

helpers.notPending = function (any) {
  return !(any instanceof Promise)
}

helpers.failed = function (any) {
  return any instanceof Error
}

helpers.notFailed = function (any) {
  return !(any instanceof Error)
}

/* Exports */
module.exports = helpers
