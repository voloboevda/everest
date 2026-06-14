# Complexity Observer

Detects unnecessary complexity. If complexity increases without reason → flag.

## Detect

- Section with >6 interactive elements
- More than 1 primary action
- Redundant components doing same job
- Animation layers stacking (blur + scale + opacity scrub)
- New abstractions for one-off UI

## Auto-refinement triggers

- UI section >6 components
- Multiple competing CTAs
- Duplicated patterns
- New component when whitelist pattern exists

## Action

Invoke simplifier. Target complexity score ≤ 4.
