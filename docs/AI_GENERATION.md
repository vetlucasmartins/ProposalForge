# AI Generation

## Goal

The LLM should produce a useful first draft, not become the source of truth. ProposalForge must store structured proposal data and allow users to edit every generated section before sharing.

## Generation Pipeline

1. Normalize the briefing input.
2. Validate all fields with schemas.
3. Calculate an initial price estimate.
4. Load template instructions and default deliverables.
5. Assemble a prompt with strict output requirements.
6. Call the configured LLM provider.
7. Parse the response as JSON.
8. Validate the JSON against the proposal draft schema.
9. Sanitize Markdown content.
10. Persist sections, deliverables, milestones, pricing and generation metadata in a future runtime implementation.

## Prompt Inputs

The prompt should include:

- Template name and service category.
- Client type.
- Client problem.
- Client objective.
- Selected services.
- Budget range.
- Deadline or desired timeline.
- Constraints.
- Pricing estimate.
- Required proposal sections.
- Tone rules.
- Output JSON schema.

The prompt should not include:

- API keys.
- Internal logs.
- unrelated user profile data.
- Other clients' proposals.
- Hidden chain-of-thought instructions.

## Output Contract

The LLM response must be structured JSON. Free-form prose should only appear inside known string fields.

```ts
type GeneratedProposalDraft = {
  title: string
  executiveSummary: string
  clientProblem: string
  proposedSolution: string
  scope: Array<{
    title: string
    description: string
  }>
  deliverables: Array<{
    title: string
    description: string
    category: string
    quantity: number
    unitPrice: number
  }>
  milestones: Array<{
    title: string
    description: string
    durationDays: number
  }>
  assumptions: string[]
  exclusions: string[]
  nextSteps: string[]
  terms: string[]
}
```

## Tone Rules

Generated proposals should be direct, specific and commercial. Avoid generic AI phrasing.

Use:

- Concrete business outcomes.
- Clear deliverables.
- Plain language.
- Scope boundaries.
- Practical next steps.

Avoid:

- Overpromising results.
- Legal guarantees.
- Vague transformation claims.
- Excessive adjectives.
- Long filler introductions.

## Validation and Repair

If JSON parsing fails:

1. Attempt one structured repair request with the invalid output.
2. Validate the repaired JSON.
3. If repair fails, store a failed generation event and return a user-friendly error.

If validation fails:

- Do not save partial generated content as proposal sections.
- Store sanitized failure metadata.
- Give the user a retry option.

## Safety Rules

- Treat LLM output as untrusted.
- Escape or sanitize Markdown before rendering.
- Never let the LLM decide final owner, status, total amount or share token.
- Never send credentials or private database data to the LLM.
- Log provider errors without exposing secrets.
- Use rate limits to avoid accidental generation loops.

## Prompt Versioning

Every generation should record a `prompt_version`, for example:

```text
proposal-draft.v1
section-regeneration.v1
```

When changing prompt behavior, create a new version instead of silently changing historical behavior. This makes generation quality easier to debug.

## Regeneration

The MVP can support two regeneration modes:

- Full proposal regeneration from the original briefing.
- Single section regeneration with a user instruction.

Single-section regeneration must preserve proposal totals, status, share token and other sections unless the user explicitly applies changes.
