# Pricing Model

## Goal

ProposalForge should help users produce prices that are explainable, editable and tied to scope. The pricing engine is not meant to replace the user's judgment. It should create a defensible starting point and keep proposal totals consistent.

## Inputs

Core pricing inputs:

- Proposal template.
- Selected services.
- Quantity or unit count.
- Complexity.
- Deadline urgency.
- Budget range.
- Optional discount.
- Optional tax.
- Currency.

## Complexity Levels

Recommended MVP levels:

| Level | Multiplier | Use When |
| --- | --- | --- |
| `starter` | `0.85` | Low-risk, simple scope, few dependencies. |
| `standard` | `1.00` | Normal project complexity. |
| `advanced` | `1.35` | Many integrations, custom workflows or unclear requirements. |

## Urgency Levels

Urgency can be calculated from the deadline.

| Level | Multiplier | Use When |
| --- | --- | --- |
| `normal` | `1.00` | Timeline fits default delivery range. |
| `priority` | `1.15` | Timeline is tighter than normal. |
| `rush` | `1.30` | Timeline requires schedule compression. |

## Formula

Calculate each service line on the server:

```ts
lineAmount =
  basePrice *
  quantity *
  complexityMultiplier *
  urgencyMultiplier
```

Then calculate totals:

```ts
subtotal = sum(lineAmount)
total = subtotal - discountAmount + taxAmount
```

All monetary math should use integer cents internally or a decimal-safe money library. Do not use floating point numbers for persisted totals.

## Template Defaults

### Web Design

Typical service keys:

- `discovery`
- `wireframes`
- `visual-design`
- `responsive-pages`
- `cms-setup`
- `seo-basics`
- `launch-support`

### AI Automation

Typical service keys:

- `process-mapping`
- `workflow-automation`
- `llm-prompting`
- `tool-integration`
- `qa-and-monitoring`
- `training`

### CRM

Typical service keys:

- `pipeline-design`
- `custom-fields`
- `data-import`
- `automation`
- `dashboard`
- `team-training`

### SaaS MVP

Typical service keys:

- `product-discovery`
- `auth`
- `dashboard`
- `core-workflow`
- `billing`
- `admin-tools`
- `deployment`

### Dashboard

Typical service keys:

- `data-source-setup`
- `data-modeling`
- `visualization`
- `filters`
- `scheduled-refresh`
- `handoff`

## Budget Range Handling

The budget range should inform the proposal but should not silently override the calculated price.

Recommended behavior:

- If calculated total is inside budget range, show normal confidence.
- If calculated total is below range, suggest adding scope or preserving price as value-based positioning.
- If calculated total is above range, show a scope warning and suggest reducing deliverables.
- Never modify service line prices only to fit the budget without showing the user.

## Editable Overrides

Users should be able to edit:

- Line item title.
- Description.
- Quantity.
- Unit price.
- Discount.
- Tax.
- Final proposal wording.

The app should recalculate totals after every pricing edit and store an event when the final total changes after a proposal has been sent.

## Tests

Pricing tests should cover:

- Complexity multiplier.
- Urgency multiplier.
- Quantity multiplication.
- Discount and tax order.
- Rounding behavior.
- Budget range warnings.
- Server-side recalculation when client submits edited line items.
