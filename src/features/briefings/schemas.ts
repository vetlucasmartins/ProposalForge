import { z } from "zod";

export const serviceKeySchema = z
  .string()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9][a-z0-9-]*$/, "Use a stable kebab-case service key.");

export const clientTypeSchema = z.enum([
  "startup",
  "small-business",
  "agency",
  "consultant",
  "nonprofit",
  "enterprise",
  "other",
]);

export const briefingInputSchema = z
  .object({
    templateId: z.string().uuid(),
    clientName: z.string().trim().min(1).max(160),
    clientEmail: z.string().trim().email().optional(),
    clientType: clientTypeSchema,
    problem: z.string().trim().min(20).max(2_000),
    objective: z.string().trim().min(20).max(2_000),
    budgetMin: z.number().nonnegative().optional(),
    budgetMax: z.number().nonnegative().optional(),
    deadline: z.string().date().optional(),
    services: z.array(serviceKeySchema).min(1).max(20),
    constraints: z.string().trim().max(2_000).optional(),
    rawNotes: z.string().trim().max(4_000).optional(),
  })
  .strict()
  .superRefine((input, context) => {
    if (
      input.budgetMin !== undefined &&
      input.budgetMax !== undefined &&
      input.budgetMin > input.budgetMax
    ) {
      context.addIssue({
        code: "custom",
        path: ["budgetMax"],
        message: "Budget maximum must be greater than or equal to budget minimum.",
      });
    }
  });

export type BriefingInput = z.infer<typeof briefingInputSchema>;
