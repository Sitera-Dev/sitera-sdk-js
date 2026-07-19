# Sitera SDK Publication Requirements

Version: 0.1.0

Status: Draft

---

# Goal

The objective of this document is to define the minimum quality, architecture, documentation, testing, and packaging requirements before the Sitera SDK can be published to the official GitHub repository.

This document serves as the engineering checklist for contributors.

Passing every requirement means the SDK is considered ready for public consumption.

---

# 1. General Requirements

The SDK must:

- be framework agnostic
- support JavaScript
- support TypeScript
- support ESM
- be tree-shakeable
- have zero UI dependencies
- expose a stable public API
- compile without warnings
- pass all tests
- include documentation
- be production quality

---

# 2. Architecture

The SDK must be divided into:

- client
- providers
- core
- helpers
- types
- generators
- tests
- examples

The public API must never expose internal implementations.

The SDK must depend only on abstractions.

Project structure must be as following:

src/
├── README.md              # Getting started
├── REQUIREMENTS.md        # Engineering requirements
├── ARCHITECTURE.md        # SDK architecture
├── SKILL.md               # AI coding guideline
├── CONTRIBUTING.md
├── CHANGELOG.md
├── ROADMAP.md
├── SECURITY.md
├── LICENSE
├── package.json
├── examples/
├── docs/
│   ├── api.md
│   ├── providers.md
│   ├── generators.md
│   ├── business-model.md
│   └── migration.md
└── src/

---

# 3. Public API

Required exports:

- createSiteraClient
- getBusiness
- getSnapshot
- createSiteraCssVariables
- formatMoney
- normalizePhoneNumber
- createWhatsAppUrl
- all public types
- all error classes

No internal paths may be imported by consumers.

Good:

import { createSiteraClient } from "@sitera/sdk"

Bad:

import GeneratedProvider from ".../providers/generated"

---

# 4. Data Models

Every exported model must be:

- strongly typed
- documented
- immutable by convention
- JSON serializable

No exported type may use:

- any
- Function
- Map
- Set
- Date
- BigInt

---

# 5. Provider Architecture

The SDK must communicate only through the DataProvider interface.

The client must never know which provider is being used.

Changing the provider implementation must not require changes to application code.

---

# 6. Generated Provider

The built-in provider must:

- generate deterministic data
- support seeded generation
- generate internally consistent relationships
- produce realistic business data
- support every business category
- never regenerate unrelated entities

---

# 7. Business Categories

The SDK must include presets for:

- Restaurant
- Cafe
- Professional Service
- Beauty
- Education
- Property
- Healthcare
- Automotive
- Hospitality
- Local Brand

---

# 8. Business Snapshot

The SDK must expose:

getSnapshot()

The snapshot must include:

- Business
- Locations
- Services
- Products
- Team
- Testimonials
- FAQs
- Gallery
- Promotions
- Pages
- Navigation
- Settings

---

# 9. Helper Functions

Minimum helper functions:

- formatMoney
- parseMoney
- normalizePhoneNumber
- formatPhoneNumber
- createWhatsAppUrl
- createSiteraCssVariables
- isBusinessOpenNow
- getTodayOperatingHours
- normalizeUrl
- isSafeUrl

---

# 10. Error Handling

Required errors:

- SiteraError
- SiteraConfigurationError
- SiteraValidationError
- SiteraProviderError
- SiteraNotFoundError

Errors must:

- have stable error codes
- include useful messages
- preserve causes

---

# 11. TypeScript

The SDK must compile with:

strict=true

Rules:

- no any
- exactOptionalPropertyTypes
- noUncheckedIndexedAccess
- declaration generation enabled

---

# 12. Build

Required outputs:

dist/
  index.js
  index.d.ts

Build must succeed with:

pnpm build

---

# 13. Testing

Coverage target:

> 85%

Tests required:

- configuration
- client
- provider
- helpers
- business
- services
- products
- pages
- navigation
- serialization
- deterministic generation
- build

---

# 14. Documentation

Required files:

README.md

Must contain:

- installation
- quick start
- examples
- API
- helpers
- configuration
- categories
- FAQ

---

# 15. Examples

Required example applications:

examples/

- vanilla-js
- typescript
- node

Each example must compile.

---

# 16. Package

package.json must contain:

- exports
- types
- sideEffects
- repository
- homepage
- keywords
- license

---

# 17. Repository

Repository must include:

README.md

CHANGELOG.md

LICENSE

CONTRIBUTING.md

SECURITY.md

CODE_OF_CONDUCT.md

ROADMAP.md

SKILL.md

.github/

---

# 18. GitHub Actions

CI must execute:

- install
- lint
- typecheck
- test
- build

Pull Requests may only be merged when every workflow passes.

---

# 19. Publishing Checklist

Before creating a release:

- All tests pass
- Build succeeds
- Examples compile
- Documentation updated
- CHANGELOG updated
- Version bumped
- Git tag created
- Release notes prepared

---

# 20. Future Compatibility

The public API must remain stable.

Breaking changes require:

- major version bump
- migration guide
- changelog entry

---

# Definition of Done

The SDK is considered ready for public release when:

- All publication requirements are satisfied.
- CI passes.
- Documentation is complete.
- Examples run successfully.
- No known critical issues remain.