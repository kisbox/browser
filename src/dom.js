"use strict"
/**
 * A simple module that ease access to HTML DOM nodes. Any HTML element having
 * an `id` at loading time is registered at dom[id]. This is to avoid running
 * `querySelector` multiple times.
 *
 * @exports dom
 */
const dom = exports

const my = require("@kisbox/helpers")

/**
 * Add all HTMLElement having an `id` attributes to dom. If **tree** is
 * given, explore only this part of the DOM.
 *
 * @param {HTMLElement} [tree=document]
 */
dom.$ingest = function (tree = document) {
  if (tree.id) dom[tree.id] = tree
  const array = tree.querySelectorAll("[id]")
  array.forEach(element => {
    if (element.id) dom[element.id] = element
  })
}
my.property.lock(dom, "$ingest")

/* Populate */
dom.html = document.html
dom.head = document.head
dom.body = document.body
dom.$ingest()
