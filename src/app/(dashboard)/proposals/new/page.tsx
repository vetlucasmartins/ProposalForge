import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";

const serviceOptions = [
  { value: "discovery", label: "Discovery" },
  { value: "automation", label: "Automation" },
  { value: "dashboard", label: "Dashboard" },
  { value: "crm", label: "CRM" },
  { value: "web-design", label: "Web design" },
  { value: "saas-mvp", label: "SaaS MVP" },
];

const inputClassName =
  "min-h-11 w-full rounded-md border border-[var(--line)] bg-white px-3 py-2 text-base text-[color:var(--ink)] shadow-sm outline-none transition-colors focus:border-[var(--accent)]";
const labelClassName = "text-sm font-semibold text-[color:var(--ink)]";

export default function NewProposalPage() {
  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Briefing"
        title="New proposal"
        description="Capture the client context needed for scope, pricing and draft generation."
      />

      <form className="grid gap-6" aria-label="Proposal briefing form">
        <section className="grid gap-4 border border-[var(--line)] bg-[var(--surface)] p-5 md:grid-cols-2">
          <div className="grid gap-2">
            <label className={labelClassName} htmlFor="client-name">
              Client name
            </label>
            <input id="client-name" name="clientName" className={inputClassName} />
          </div>
          <div className="grid gap-2">
            <label className={labelClassName} htmlFor="client-email">
              Client email
            </label>
            <input id="client-email" name="clientEmail" type="email" className={inputClassName} />
          </div>
          <div className="grid gap-2">
            <label className={labelClassName} htmlFor="client-type">
              Client type
            </label>
            <select id="client-type" name="clientType" className={inputClassName} defaultValue="">
              <option value="" disabled>
                Select client type
              </option>
              <option value="startup">Startup</option>
              <option value="small-business">Small business</option>
              <option value="agency">Agency</option>
              <option value="consultant">Consultant</option>
              <option value="nonprofit">Nonprofit</option>
              <option value="enterprise">Enterprise</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className={labelClassName} htmlFor="template">
              Template
            </label>
            <select id="template" name="template" className={inputClassName} defaultValue="">
              <option value="" disabled>
                Select template
              </option>
              <option value="web-design">Web Design</option>
              <option value="ai-automation">AI Automation</option>
              <option value="crm">CRM</option>
              <option value="saas-mvp">SaaS MVP</option>
              <option value="dashboard">Dashboard</option>
            </select>
          </div>
        </section>

        <section className="grid gap-4 border border-[var(--line)] bg-[var(--surface)] p-5">
          <div className="grid gap-2">
            <label className={labelClassName} htmlFor="problem">
              Client problem
            </label>
            <textarea id="problem" name="problem" rows={4} className={inputClassName} />
          </div>
          <div className="grid gap-2">
            <label className={labelClassName} htmlFor="objective">
              Desired outcome
            </label>
            <textarea id="objective" name="objective" rows={4} className={inputClassName} />
          </div>
          <fieldset className="grid gap-3">
            <legend className={labelClassName}>Services</legend>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {serviceOptions.map((service) => (
                <label
                  key={service.value}
                  className="flex min-h-11 items-center gap-3 rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm font-medium text-[color:var(--ink)]"
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={service.value}
                    className="size-4 accent-[var(--accent)]"
                  />
                  {service.label}
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        <section className="grid gap-4 border border-[var(--line)] bg-[var(--surface)] p-5 md:grid-cols-3">
          <div className="grid gap-2">
            <label className={labelClassName} htmlFor="budget-min">
              Budget min
            </label>
            <input
              id="budget-min"
              name="budgetMin"
              type="number"
              min="0"
              className={inputClassName}
            />
          </div>
          <div className="grid gap-2">
            <label className={labelClassName} htmlFor="budget-max">
              Budget max
            </label>
            <input
              id="budget-max"
              name="budgetMax"
              type="number"
              min="0"
              className={inputClassName}
            />
          </div>
          <div className="grid gap-2">
            <label className={labelClassName} htmlFor="deadline">
              Deadline
            </label>
            <input id="deadline" name="deadline" type="date" className={inputClassName} />
          </div>
          <div className="grid gap-2 md:col-span-3">
            <label className={labelClassName} htmlFor="constraints">
              Constraints
            </label>
            <textarea id="constraints" name="constraints" rows={3} className={inputClassName} />
          </div>
          <div className="grid gap-2 md:col-span-3">
            <label className={labelClassName} htmlFor="raw-notes">
              Internal notes
            </label>
            <textarea id="raw-notes" name="rawNotes" rows={3} className={inputClassName} />
          </div>
        </section>

        <div className="flex flex-col gap-3 border border-[var(--line)] bg-[var(--surface)] p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
            Persistence and AI generation are not connected in this foundation step.
          </p>
          <button
            type="button"
            disabled
            className="min-h-11 rounded-md bg-[var(--soft)] px-4 py-2 text-sm font-semibold text-[color:var(--muted)]"
          >
            Save briefing draft
          </button>
        </div>
      </form>
    </DashboardShell>
  );
}
