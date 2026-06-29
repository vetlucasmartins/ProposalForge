import { describe, expect, it } from "vitest";

import { parseGeneratedProposalDraft } from "../server/ai/generated-draft";

const validDraft = {
  title: "CRM automation proposal",
  executiveSummary: "Implement a focused lead qualification workflow.",
  clientProblem: "Leads arrive quickly but follow-up is manual.",
  proposedSolution: "Connect the website form, CRM and reporting dashboard.",
  scope: [{ title: "Automation setup", description: "Map and automate lead routing." }],
  deliverables: [
    {
      title: "CRM workflow",
      description: "A configured workflow for lead routing.",
      category: "automation",
      quantity: 1,
      unitPrice: 2500,
    },
  ],
  milestones: [
    {
      title: "Discovery",
      description: "Confirm fields, owner rules and reporting needs.",
      durationDays: 5,
    },
  ],
  assumptions: ["Client provides CRM admin access."],
  exclusions: ["Paid ad campaign management is excluded."],
  nextSteps: ["Confirm scope and kickoff date."],
  terms: ["50% deposit to begin."],
};

describe("parseGeneratedProposalDraft", () => {
  it("parses valid JSON strings and trims generated text", () => {
    const result = parseGeneratedProposalDraft(
      JSON.stringify({
        ...validDraft,
        title: "  CRM automation proposal  ",
      }),
    );

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("CRM automation proposal");
    }
  });

  it("rejects malformed JSON strings", () => {
    const result = parseGeneratedProposalDraft("{not-json");

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe("INVALID_JSON");
    }
  });

  it("rejects schema-invalid or over-posted LLM output", () => {
    const result = parseGeneratedProposalDraft({
      ...validDraft,
      ownerId: "attacker-controlled-owner",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe("VALIDATION_ERROR");
    }
  });
});
