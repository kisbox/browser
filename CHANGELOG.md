**browser /**
[Readme](https://github.com/kisbox/browser/blob/master/README.md)
• [Changelog](https://github.com/kisbox/browser/blob/master/CHANGELOG.md)

# Changelog

All notable changes to this project will be documented in this file.

This project adheres to **[Semantic
Versioning](https://semver.org/spec/v2.0.0.html)**. Version syntax is
`{major}.{minor}.{patch}`, where a field bump means:

- **Patch**: The release contains bug fixes.
- **Minor**: The release contains backward-compatible changes.
- **Major**: The release contains compatibility-breaking changes.

**Remember:** Both micro and minor releases are guaranteed to respect
backward-compatibility and can be updated to without risk of breakage. For major
releases, please check this changelog before upgrading.

## 1.0.0-beta.21 - 2021-09-14

### Changed

- Meta: Update dependencies.

## 1.0.0-beta.18 - 2020-11-22

### Added

- Logic: Add class-wide $inputDelay parameter.

### Fixed

- Logic: Fix a bug in $group custom attribute.

## 1.0.0-beta.17 - 2020-11-07

### Fixed

- Logic: Set a delay for importing HTML range value.

## 1.0.0-beta.15 - 2020-07-12

### Fixed

- Logic: Fix the empty ellispis case (View).

## 1.0.0-beta.13 - 2020-07-05

### Breaking

- Logic: Breaking change: Import empty inputs as null rather than "" (View).

## 1.0.0-beta.12 - 2020-06-21

### Changed

- Logic: Inputs treat nullish values as empty strings (View).

### Fixed

- Logic: Fix <textarea> value attribute binding (View).
- Logic: Fix a delay in user input timing (View).

## 1.0.0-beta.11 - 2020-06-14

### Changed

- Logic: `$import()` input value on <ENTER> (View).
- Meta: Update .browserslistrc.

## 1.0.0-beta.10 - 2020-06-07

### Changed

- Meta: Switch to flattened @kisbox/helpers.

## 1.0.0-beta.9 - 2020-05-24

### Fixed

- Logic: Support attributes `for` and `selectedIndex` (View).
- Logic: Fix `$label` custom attribute (View).

## 1.0.0-beta.8 - 2020-05-17

### Fixed

- Logic: Fix `domNode` property enumerability (View).
- Logic: Fix parameters import (View).
- UI: Fix LiveArray view syncing (View).

## 1.0.0-beta.7 - 2020-05-02

### Added

- Logic: Add View.helpers to handle definition states.

## 1.0.0-beta.5 - 2020-04-11

### Breaking

- Logic: \$mount() now replaces other child nodes (View).

### Changed

- API: \$mount() on `body` by default.
- Logic: Delay input value (View). Input values are now passed to views after 1s
  without typing.

### Fixed

- Logic: Fix handling of templates with one element (View).
- Logic: Fix handling of `readonly` attribute (View).
- Logic: Fix templates made of one variable (View).

## 1.0.0-beta.4 - 2020-04-04

### Fixed

- Logic: Fix checkbox attributes handling (View).
- UI: Fix radio `$group` consistency.

## 1.0.0-beta.3 - 2020-03-28

### Added

- API: `$show()` & `$hide()` methods (View).
- API: Add `$group` custom attribute (View).
- Logic: Add `insertBefore()` & `insertAfter()` in html.js.

### Fixed

- API: Fix custom attribute '\$label' (View).
- Logic: Fix handling of empty templates (View).
- Logic: Fix class initialization (View).
- Logic: Fix template rewriting loop (View).

## 1.0.0-beta.2 - 2020-03-07

### Fixed

- API: Fix 'dom' `.html`, `.head` and `.body`.
- Meta: Fix @kisbox/model version.
- Meta: Fix dependencies version.

## 1.0.0-beta.1 - 2020-02-29

Initial release.
