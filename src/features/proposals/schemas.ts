import { z } from "zod";

export const proposalStatusSchema = z.enum(["draft", "sent", "accepted", "rejected"]);

export type ProposalStatus = z.infer<typeof proposalStatusSchema>;
