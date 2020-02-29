/* eslint-env jasmine */
"use strict"

const expand = require("../src/view.expand.js")

/* Specs */

describe("expand", () => {
  it("returns normal strings unmodified", () => {
    const string = "Hello, World!"
    const expanded = expand(string)
    expect(expanded).toEqual(string)
  })

  it("returns normal HTML unmodified", () => {
    const string = "<em>Hello, World!</em>"
    const expanded = expand(string)
    expect(expanded).toBe(string)
  })

  it("expands %key", () => {
    const string = "%key"
    const expanded = expand(string)
    expect(expanded).toBe(key("key"))
  })

  it("ignores \\%key", () => {
    const string = "\\%key"
    const expanded = expand(string)
    expect(expanded).toBe("%key")
  })

  it("expands %{key}", () => {
    const string = "%{key}"
    const expanded = expand(string)
    expect(expanded).toBe(key("key"))
  })

  it("ignores \\%{key}", () => {
    const string = "\\%{key}"
    const expanded = expand(string)
    expect(expanded).toBe("%{key}")
  })

  it("expands ...%key", () => {
    const string = "...%key"
    const expanded = expand(string)
    expect(expanded).toBe(ellipsis("key"))
  })

  it("ignores ...\\%key", () => {
    const string = "...\\%key"
    const expanded = expand(string)
    expect(expanded).toBe("...%key")
  })

  it("expands ...%{key}", () => {
    const string = "...%{key}"
    const expanded = expand(string)
    expect(expanded).toBe(ellipsis("key"))
  })

  it("ignores ...\\%{key}", () => {
    const string = "...\\%{key}"
    const expanded = expand(string)
    expect(expanded).toBe("...%{key}")
  })

  it("expands %func:key", () => {
    const string = "%func:key"
    const expanded = expand(string)
    expect(expanded).toBe(key("key", "func"))
  })

  it("ignores \\%func:key", () => {
    const string = "\\%func:key"
    const expanded = expand(string)
    expect(expanded).toBe("%func:key")
  })

  it("expands %{func:key}", () => {
    const string = "%{func:key}"
    const expanded = expand(string)
    expect(expanded).toBe(key("key", "func"))
  })

  it("ignores \\%{func:key}", () => {
    const string = "\\%{func:key}"
    const expanded = expand(string)
    expect(expanded).toBe("%{func:key}")
  })

  it("expands %func:...key", () => {
    const string = "%func:...key"
    const expanded = expand(string)
    expect(expanded).toBe(ellipsis("key", "func"))
  })

  it("ignores \\%func:...key", () => {
    const string = "\\%func:...key"
    const expanded = expand(string)
    expect(expanded).toBe("%func:...key")
  })

  it("expands %{func:...key}", () => {
    const string = "%{func:...key}"
    const expanded = expand(string)
    expect(expanded).toBe(ellipsis("key", "func"))
  })

  it("ignores \\%{func:...key}", () => {
    const string = "\\%{func:...key}"
    const expanded = expand(string)
    expect(expanded).toBe("%{func:...key}")
  })
})

/* Helpers */

function key (key, transform = "") {
  return `<template data-type="variable" data-func="${transform}">${key}</template>`
}

function ellipsis (key, transform = "") {
  return `<template data-type="ellipsis" data-func="${transform}">${key}</template>`
}
