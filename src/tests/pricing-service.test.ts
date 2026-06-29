import { describe, expect, it } from "vitest";

import { calculatePricingEstimate } from "../features/pricing/pricing-service";

const baseInput = {
  currency: "USD",
  complexity: "standard" as const,
  urgency: "normal" as const,
  services: [
    {
      serviceKey: "dashboard",
      title: "Analytics dashboard",
      quantity: 1,
      basePriceCents: 200_000,
    },
  ],
};

describe("calculatePricingEstimate", () => {
  it("calculates service lines with quantity, complexity and urgency multipliers", () => {
    const estimate = calculatePricingEstimate({
      ...baseInput,
      complexity: "advanced",
      urgency: "rush",
      services: [
        {
          serviceKey: "dashboard",
          title: "Analytics dashboard",
          quantity: 2,
          basePriceCents: 200_000,
        },
      ],
    });

    expect(estimate.lines).toHaveLength(1);
    expect(estimate.lines[0]?.amountCents).toBe(702_000);
    expect(estimate.subtotalCents).toBe(702_000);
    expect(estimate.totalCents).toBe(702_000);
  });

  it("applies discount before tax and never returns a negative total", () => {
    const estimate = calculatePricingEstimate({
      ...baseInput,
      discountCents: 250_000,
      taxCents: 10_000,
    });

    expect(estimate.subtotalCents).toBe(200_000);
    expect(estimate.totalCents).toBe(0);
  });

  it("returns budget guidance without silently changing the calculated price", () => {
    const estimate = calculatePricingEstimate({
      ...baseInput,
      budgetMinCents: 100_000,
      budgetMaxCents: 150_000,
    });

    expect(estimate.totalCents).toBe(200_000);
    expect(estimate.budgetStatus).toBe("above-budget");
    expect(estimate.warnings).toContain("Calculated total is above the provided budget range.");
  });
});
