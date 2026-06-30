# API and Server Contracts

## Design Rules

- Validate every input with schemas before touching a future runtime database.
- Never accept `owner_id`, totals or status timestamps from the browser.
- Use a consistent response envelope for route handlers.
- Prefer server actions for authenticated dashboard mutations.
- Keep public routes narrow and token-based.

## Response Envelope

```ts
type ApiResponse<T> =
  | {
      success: true
      data: T
      meta?: Record<string, unknown>
    }
  | {
      success: false
      error: {
        code: string
        message: string
        details?: unknown
      }
    }
```

## Future Authenticated Contracts

### `POST /api/proposals/generate`

Creates a proposal draft from a briefing and template.

Request:

```json
{
  "templateId": "uuid",
  "clientName": "Acme Studio",
  "clientEmail": "buyer@example.com",
  "clientType": "small-business",
  "problem": "Leads arrive from ads, but follow-up is manual.",
  "objective": "Automate lead qualification and speed up sales response.",
  "budgetMin": 3000,
  "budgetMax": 7000,
  "deadline": "2026-08-30",
  "services": ["automation", "crm", "dashboard"],
  "constraints": "Must integrate with the existing website form.",
  "rawNotes": "Client uses HubSpot Starter."
}
```

Response:

```json
{
  "success": true,
  "data": {
    "proposalId": "uuid",
    "status": "draft",
    "generationId": "uuid"
  }
}
```

### `GET /api/proposals`

Lists proposals for the authenticated user.

Query parameters:

| Parameter | Type | Notes |
| --- | --- | --- |
| `status` | string | Optional proposal status filter. |
| `limit` | number | Default `20`, max `100`. |
| `cursor` | string | Pagination cursor. |

### `GET /api/proposals/:proposalId`

Returns a full editable proposal model for the owner.

### `PATCH /api/proposals/:proposalId`

Updates editable fields, sections, deliverables or milestones.

Rules:

- `accepted` and `rejected` proposals cannot be edited directly.
- Totals must be recalculated server-side.
- Section order must be normalized server-side.

### `POST /api/proposals/:proposalId/send`

Marks a proposal as sent and creates or reuses a share token.

### `POST /api/proposals/:proposalId/export-pdf`

Generates a PDF from the saved proposal state.

Response:

```json
{
  "success": true,
  "data": {
    "exportId": "uuid",
    "downloadUrl": "https://signed-url.example"
  }
}
```

### `POST /api/pricing/estimate`

Returns a pricing estimate without creating a proposal.

Request:

```json
{
  "templateId": "uuid",
  "services": ["web-design", "analytics"],
  "complexity": "standard",
  "deadline": "2026-08-30",
  "budgetMin": 2500,
  "budgetMax": 6000
}
```

## Public Contracts

### `GET /api/public/proposals/:shareToken`

Returns a client-safe proposal view.

Do not return:

- `owner_id`
- generation logs
- internal notes
- editable metadata
- private storage paths

### `POST /api/public/proposals/:shareToken/accept`

Accepts a sent proposal.

Request:

```json
{
  "signerName": "Jane Buyer",
  "signerEmail": "jane@example.com",
  "signatureText": "Jane Buyer",
  "acceptedTerms": true
}
```

Rules:

- Proposal must be in `sent` status.
- Proposal must not be expired.
- Signer name, email and signature text are required.
- Acceptance creates an event and sets proposal status to `accepted`.
- The server captures timestamp, user agent and hashed or redacted IP.

## Server Actions

Recommended authenticated server actions:

- `createProposalFromBriefing(input)`
- `saveProposalDraft(proposalId, patch)`
- `sendProposal(proposalId)`
- `rejectProposal(proposalId, reason?)`
- `exportProposalPdf(proposalId)`
- `regenerateProposalSection(proposalId, sectionId, instruction)`

Keep server actions small. Each action should validate input, call a domain service and return a typed result.

## Domain Services

Recommended service names:

- `ProposalService`
- `BriefingService`
- `PricingService`
- `TemplateService`
- `ProposalGenerationService`
- `PdfExportService`
- `PublicProposalService`

Services should receive already-authenticated context and avoid reading directly from browser state.

## Error Codes

| Code | Meaning |
| --- | --- |
| `UNAUTHORIZED` | User is not authenticated. |
| `FORBIDDEN` | User cannot access the resource. |
| `NOT_FOUND` | Resource does not exist or is not visible. |
| `VALIDATION_ERROR` | Request payload failed schema validation. |
| `INVALID_STATUS_TRANSITION` | Requested status change is not allowed. |
| `GENERATION_FAILED` | LLM generation failed after retry or repair. |
| `PDF_EXPORT_FAILED` | PDF rendering or storage failed. |
| `PROPOSAL_EXPIRED` | Public acceptance attempted after expiration. |
