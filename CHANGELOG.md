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
