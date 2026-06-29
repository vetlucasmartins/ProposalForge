import { err, ok, type Result } from "@/lib/result";

import { type ProposalStatus } from "./schemas";

const allowedTransitions: Record<ProposalStatus, ReadonlySet<ProposalStatus>> = {
  draft: new Set(["draft", "sent", "rejected"]),
  sent: new Set(["sent", "accepted", "rejected"]),
  accepted: new Set(["accepted"]),
  rejected: new Set(["rejected"]),
};

export function canTransitionProposalStatus(
  currentStatus: ProposalStatus,
  nextStatus: ProposalStatus,
): boolean {
  return allowedTransitions[currentStatus].has(nextStatus);
}

export function transitionProposalStatus(
  currentStatus: ProposalStatus,
  nextStatus: ProposalStatus,
): Result<ProposalStatus> {
  if (canTransitionProposalStatus(currentStatus, nextStatus)) {
    return ok(nextStatus);
  }

  return err(
    "INVALID_STATUS_TRANSITION",
    `Cannot transition proposal status from ${currentStatus} to ${nextStatus}.`,
  );
}
