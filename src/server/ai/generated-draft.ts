import { z } from "zod";

import { err, ok, type Result } from "@/lib/result";

function cleanGeneratedText(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[^\S\r\n]+/g, " ")
    .trim();
}

function generatedTextSchema(maxLength: number) {
  return z
    .string()
    .transform(cleanGeneratedText)
    .pipe(
      z
        .string()
        .min(1)
        .max(maxLength)
        .refine((value) => !/<\s*script/i.test(value), "Script tags are not allowed."),
    );
}

const generatedScopeItemSchema = z
  .object({
    title: generatedTextSchema(160),
    description: generatedTextSchema(1_200),
  })
  .strict();

const generatedDeliverableSchema = z
  .object({
    title: generatedTextSchema(160),
    description: generatedTextSchema(1_200),
    category: generatedTextSchema(80),
    quantity: z.number().positive().max(100),
    unitPrice: z.number().nonnegative().max(10_000_000),
  })
  .strict();

const generatedMilestoneSchema = z
  .object({
    title: generatedTextSchema(160),
    description: generatedTextSchema(1_200),
    durationDays: z.number().int().positive().max(365),
  })
  .strict();

export const generatedProposalDraftSchema = z
  .object({
    title: generatedTextSchema(180),
    executiveSummary: generatedTextSchema(2_000),
    clientProblem: generatedTextSchema(2_000),
    proposedSolution: generatedTextSchema(2_000),
    scope: z.array(generatedScopeItemSchema).min(1).max(12),
    deliverables: z.array(generatedDeliverableSchema).min(1).max(30),
    milestones: z.array(generatedMilestoneSchema).min(1).max(12),
    assumptions: z.array(generatedTextSchema(400)).max(20),
    exclusions: z.array(generatedTextSchema(400)).max(20),
    nextSteps: z.array(generatedTextSchema(400)).max(12),
    terms: z.array(generatedTextSchema(400)).max(20),
  })
  .strict();

export type GeneratedProposalDraft = z.infer<typeof generatedProposalDraftSchema>;

function parseJson(value: string): Result<unknown> {
  try {
    return ok(JSON.parse(value) as unknown);
  } catch (error) {
    return err("INVALID_JSON", "Generated proposal draft was not valid JSON.", {
      cause: error instanceof Error ? error.message : "Unknown JSON parse error",
    });
  }
}

export function parseGeneratedProposalDraft(rawOutput: unknown): Result<GeneratedProposalDraft> {
  const parsedJson = typeof rawOutput === "string" ? parseJson(rawOutput) : ok(rawOutput);

  if (!parsedJson.success) {
    return parsedJson;
  }

  const parsedDraft = generatedProposalDraftSchema.safeParse(parsedJson.data);

  if (!parsedDraft.success) {
    return err("VALIDATION_ERROR", "Generated proposal draft failed schema validation.", {
      issues: parsedDraft.error.issues,
    });
  }

  return ok(parsedDraft.data);
}
