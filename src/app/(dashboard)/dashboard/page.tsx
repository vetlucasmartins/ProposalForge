import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ActionLink } from "@/components/ui/action-link";

const statusSummaries = [
  { label: "Draft", value: "0", note: "Internal proposals being prepared" },
  { label: "Sent", value: "0", note: "Shared proposals awaiting client action" },
  { label: "Accepted", value: "0", note: "Client-approved proposals" },
];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Workspace"
        title="Dashboard"
        description="Track proposal status, recent activity and next commercial actions from one place."
        actions={<ActionLink href="/proposals/new">New proposal</ActionLink>}
      />

      <section className="grid gap-4 md:grid-cols-3" aria-label="Proposal status summary">
        {statusSummaries.map((summary) => (
          <article
            key={summary.label}
            className="border border-[var(--line)] bg-[var(--surface)] p-5"
          >
            <p className="text-sm font-semibold uppercase text-[color:var(--muted)]">
              {summary.label}
            </p>
            <p className="mt-3 text-4xl font-bold text-[color:var(--ink)]">{summary.value}</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{summary.note}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 border border-[var(--line)] bg-[var(--surface)] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[color:var(--ink)]">Recent proposals</h2>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              Created proposals will appear here after persistence is connected.
            </p>
          </div>
          <ActionLink href="/proposals/new" variant="secondary">
            Create first draft
          </ActionLink>
        </div>
      </section>
    </DashboardShell>
  );
}
