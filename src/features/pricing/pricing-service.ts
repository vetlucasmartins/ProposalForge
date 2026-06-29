import {
  pricingEstimateInputSchema,
  type BudgetStatus,
  type ComplexityLevel,
  type NormalizedPricingEstimateInput,
  type PricingEstimateInput,
  type UrgencyLevel,
} from "./schemas";

const multiplierBasisPointsByComplexity: Record<ComplexityLevel, number> = {
  starter: 85,
  standard: 100,
  advanced: 135,
};

const multiplierBasisPointsByUrgency: Record<UrgencyLevel, number> = {
  normal: 100,
  priority: 115,
  rush: 130,
};

export type PricingEstimateLine = {
  serviceKey: string;
  title: string;
  quantity: number;
  basePriceCents: number;
  complexityMultiplier: number;
  urgencyMultiplier: number;
  amountCents: number;
};

export type PricingEstimate = {
  currency: string;
  lines: PricingEstimateLine[];
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
  budgetStatus: BudgetStatus;
  warnings: string[];
};

function calculateLineAmountCents(
  basePriceCents: number,
  quantity: number,
  complexityBasisPoints: number,
  urgencyBasisPoints: number,
): number {
  return Math.round(
    (basePriceCents * quantity * complexityBasisPoints * urgencyBasisPoints) / 10_000,
  );
}

function getBudgetStatus(
  input: Pick<NormalizedPricingEstimateInput, "budgetMinCents" | "budgetMaxCents">,
  totalCents: number,
): BudgetStatus {
  if (input.budgetMinCents === undefined && input.budgetMaxCents === undefined) {
    return "no-budget";
  }

  if (input.budgetMinCents !== undefined && totalCents < input.budgetMinCents) {
    return "below-budget";
  }

  if (input.budgetMaxCents !== undefined && totalCents > input.budgetMaxCents) {
    return "above-budget";
  }

  return "inside-budget";
}

function getBudgetWarnings(budgetStatus: BudgetStatus): string[] {
  if (budgetStatus === "below-budget") {
    return ["Calculated total is below the provided budget range."];
  }

  if (budgetStatus === "above-budget") {
    return ["Calculated total is above the provided budget range."];
  }

  return [];
}

export function calculatePricingEstimate(input: PricingEstimateInput): PricingEstimate {
  const normalizedInput = pricingEstimateInputSchema.parse(input);
  const complexityBasisPoints = multiplierBasisPointsByComplexity[normalizedInput.complexity];
  const urgencyBasisPoints = multiplierBasisPointsByUrgency[normalizedInput.urgency];

  const lines = normalizedInput.services.map((service) => ({
    serviceKey: service.serviceKey,
    title: service.title,
    quantity: service.quantity,
    basePriceCents: service.basePriceCents,
    complexityMultiplier: complexityBasisPoints / 100,
    urgencyMultiplier: urgencyBasisPoints / 100,
    amountCents: calculateLineAmountCents(
      service.basePriceCents,
      service.quantity,
      complexityBasisPoints,
      urgencyBasisPoints,
    ),
  }));

  const subtotalCents = lines.reduce((sum, line) => sum + line.amountCents, 0);
  const totalCents = Math.max(
    0,
    subtotalCents - normalizedInput.discountCents + normalizedInput.taxCents,
  );
  const budgetStatus = getBudgetStatus(normalizedInput, totalCents);

  return {
    currency: normalizedInput.currency,
    lines,
    subtotalCents,
    discountCents: normalizedInput.discountCents,
    taxCents: normalizedInput.taxCents,
    totalCents,
    budgetStatus,
    warnings: getBudgetWarnings(budgetStatus),
  };
}
