import { describe, expect, it } from "vitest";

import {
  canTransitionProposalStatus,
  transitionProposalStatus,
} from "../features/proposals/status";

describe("proposal status transitions", () => {
  it("allows the documented forward lifecycle transitions", () => {
    expect(canTransitionProposalStatus("draft", "sent")).toBe(true);
    expect(canTransitionProposalStatus("draft", "rejected")).toBe(true);
    expect(canTransitionProposalStatus("sent", "accepted")).toBe(true);
    expect(canTransitionProposalStatus("sent", "rejected")).toBe(true);
  });

  it("blocks accepted and rejected proposals from moving to another status", () => {
    expect(canTransitionProposalStatus("accepted", "draft")).toBe(false);
    expect(canTransitionProposalStatus("accepted", "sent")).toBe(false);
    expect(canTransitionProposalStatus("rejected", "draft")).toBe(false);
    expect(canTransitionProposalStatus("rejected", "sent")).toBe(false);
  });

  it("returns a typed validation result for invalid transitions", () => {
    const result = transitionProposalStatus("draft", "accepted");

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe("INVALID_STATUS_TRANSITION");
    }
  });
});
