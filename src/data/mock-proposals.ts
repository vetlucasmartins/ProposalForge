export const demoProposal = {
  title: "Revenue Operations Dashboard",
  clientName: "Acme Studio",
  status: "Sent",
  total: "$7,200",
  validUntil: "Aug 30, 2026",
  summary:
    "Replace manual weekly reporting with one executive view for pipeline, revenue and delivery health.",
  sections: [
    "Discovery and KPI mapping",
    "CRM export cleanup",
    "Dashboard build and review",
    "Launch checklist and handoff",
  ],
  timeline: "3 weeks",
};

export const proposalPipeline = [
  {
    title: "Revenue Operations Dashboard",
    clientName: "Acme Studio",
    status: "Sent",
    value: "$7,200",
    updatedAt: "Today",
  },
  {
    title: "Lead Qualification Automation",
    clientName: "Northstar Clinic",
    status: "Draft",
    value: "$5,400",
    updatedAt: "Yesterday",
  },
  {
    title: "Website Relaunch",
    clientName: "Cedar Legal",
    status: "Accepted",
    value: "$9,800",
    updatedAt: "Jun 28",
  },
];

export const statusSummaries = [
  { label: "Draft", value: "2", note: "Mock proposals being prepared" },
  { label: "Sent", value: "1", note: "Shared proposal awaiting client action" },
  { label: "Accepted", value: "1", note: "Client-approved mock proposal" },
];

export const briefingDefaults = {
  clientName: "Acme Studio",
  clientEmail: "buyer@example.com",
  clientType: "agency",
  template: "dashboard",
  problem: "Reporting is split across spreadsheets and weekly updates are too slow.",
  objective: "Give leadership one reliable dashboard for pipeline, revenue and delivery health.",
  budgetMin: "5000",
  budgetMax: "8000",
  deadline: "2026-08-30",
  constraints: "Use existing CRM exports for the first version.",
  rawNotes: "Portfolio mock data only. No persistence is connected.",
  services: ["discovery", "dashboard", "automation"],
};
