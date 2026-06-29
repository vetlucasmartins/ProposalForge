import { z } from "zod";

import { serviceKeySchema } from "../briefings/schemas";

export const complexityLevelSchema = z.enum(["starter", "standard", "advanced"]);
export const urgencyLevelSchema = z.enum(["normal", "priority", "rush"]);
export const budgetStatusSchema = z.enum([
  "no-budget",
  "inside-budget",
  "below-budget",
  "above-budget",
]);

export const pricingLineInputSchema = z
  .object({
    serviceKey: serviceKeySchema,
    title: z.string().trim().min(1).max(160),
    quantity: z.number().int().positive().max(100),
    basePriceCents: z.number().int().nonnegative(),
  })
  .strict();

export const pricingEstimateInputSchema = z
  .object({
    currency: z
      .string()
      .trim()
      .length(3)
      .transform((value) => value.toUpperCase()),
    complexity: complexityLevelSchema.default("standard"),
    urgency: urgencyLevelSchema.default("normal"),
    services: z.array(pricingLineInputSchema).min(1).max(40),
    discountCents: z.number().int().nonnegative().default(0),
    taxCents: z.number().int().nonnegative().default(0),
    budgetMinCents: z.number().int().nonnegative().optional(),
    budgetMaxCents: z.number().int().nonnegative().optional(),
  })
  .strict()
  .superRefine((input, context) => {
    if (
      input.budgetMinCents !== undefined &&
      input.budgetMaxCents !== undefined &&
      input.budgetMinCents > input.budgetMaxCents
    ) {
      context.addIssue({
        code: "custom",
        path: ["budgetMaxCents"],
        message: "Budget maximum must be greater than or equal to budget minimum.",
      });
    }
  });

export type ComplexityLevel = z.infer<typeof complexityLevelSchema>;
export type UrgencyLevel = z.infer<typeof urgencyLevelSchema>;
export type BudgetStatus = z.infer<typeof budgetStatusSchema>;
export type PricingLineInput = z.infer<typeof pricingLineInputSchema>;
export type PricingEstimateInput = z.input<typeof pricingEstimateInputSchema>;
export type NormalizedPricingEstimateInput = z.output<typeof pricingEstimateInputSchema>;
