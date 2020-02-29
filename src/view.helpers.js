"use strict"
/**
 * View custom helpers
 * */

/* Extension */
const helpers = {}

helpers.not = any => !any
helpers.has = any => !!any

/* Exports */
module.exports = helpers
