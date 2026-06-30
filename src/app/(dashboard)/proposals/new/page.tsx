import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { briefingDefaults } from "@/data/mock-proposals";

const serviceOptions = [
  { value: "discovery", label: "Discovery" },
  { value: "automation", label: "Automation" },
  { value: "dashboard", label: "Dashboard" },
  { value: "crm", label: "CRM" },
  { value: "web-design", label: "Web design" },
  { value: "saas-mvp", label: "SaaS MVP" },
];

const inputClassName =
  "pf-input min-h-12 w-full px-3 py-2 text-base text-[color:var(--ink)] outline-none transition-colors";
const labelClassName = "text-sm font-black text-[color:var(--ink)]";
const sectionTitleClassName = "text-lg font-black text-[color:var(--ink)]";
const sectionDescriptionClassName = "mt-1 text-sm leading-6 text-[color:var(--muted)]";

export default function NewProposalPage() {
  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Briefing"
        title="Mock briefing"
        description="A prefilled static form that demonstrates how ProposalForge would collect proposal inputs. Values are local mock data and are not saved."
      />

      <form className="grid gap-6" aria-label="Proposal briefing form">
        <section className="pf-surface p-5 sm:p-6">
          <div className="mb-5 flex flex-col gap-2 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className={sectionTitleClassName}>Client snapshot</h2>
              <p className={sectionDescriptionClassName}>
                Basic buyer details used to frame the proposal preview.
              </p>
            </div>
            <span className="pf-status pf-status-demo self-start">Mock data</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className={labelClassName} htmlFor="client-name">
                Client name
              </label>
              <input
                id="client-name"
                name="clientName"
                className={inputClassName}
                autoComplete="organization"
                defaultValue={briefingDefaults.clientName}
              />
            </div>
            <div className="grid gap-2">
              <label className={labelClassName} htmlFor="client-email">
                Client email
              </label>
              <input
                id="client-email"
                name="clientEmail"
                type="email"
                className={inputClassName}
                autoComplete="email"
                defaultValue={briefingDefaults.clientEmail}
              />
            </div>
            <div className="grid gap-2">
              <label className={labelClassName} htmlFor="client-type">
                Client type
              </label>
              <select
                id="client-type"
                name="clientType"
                className={inputClassName}
                defaultValue={briefingDefaults.clientType}
              >
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
                Proposal template
              </label>
              <select
                id="template"
                name="template"
                className={inputClassName}
                defaultValue={briefingDefaults.template}
              >
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
          </div>
        </section>

        <section className="pf-surface p-5 sm:p-6">
          <div className="mb-5 border-b border-[var(--line)] pb-5">
            <h2 className={sectionTitleClassName}>Problem and outcome</h2>
            <p className={sectionDescriptionClassName}>
              The short narrative that shapes scope, milestones and pricing.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className={labelClassName} htmlFor="problem">
                Client problem
              </label>
              <textarea
                id="problem"
                name="problem"
                rows={4}
                className={inputClassName}
                defaultValue={briefingDefaults.problem}
              />
            </div>
            <div className="grid gap-2">
              <label className={labelClassName} htmlFor="objective">
                Desired outcome
              </label>
              <textarea
                id="objective"
                name="objective"
                rows={4}
                className={inputClassName}
                defaultValue={briefingDefaults.objective}
              />
            </div>
            <fieldset className="grid gap-3">
              <legend className={labelClassName}>Services in scope</legend>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {serviceOptions.map((service) => (
                  <label
                    key={service.value}
                    className="pf-surface-soft flex min-h-12 items-center gap-3 px-3 py-2 text-sm font-bold text-[color:var(--ink)]"
                  >
                    <input
                      type="checkbox"
                      name="services"
                      value={service.value}
                      className="size-4 accent-[var(--accent)]"
                      defaultChecked={briefingDefaults.services.includes(service.value)}
                    />
                    {service.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </section>

        <section className="pf-surface p-5 sm:p-6">
          <div className="mb-5 border-b border-[var(--line)] pb-5">
            <h2 className={sectionTitleClassName}>Commercial frame</h2>
            <p className={sectionDescriptionClassName}>
              Budget, deadline and notes that would guide a generated proposal draft.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <label className={labelClassName} htmlFor="budget-min">
                Budget min
              </label>
              <input
                id="budget-min"
                name="budgetMin"
                type="number"
                min="0"
                inputMode="numeric"
                className={inputClassName}
                defaultValue={briefingDefaults.budgetMin}
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
                inputMode="numeric"
                className={inputClassName}
                defaultValue={briefingDefaults.budgetMax}
              />
            </div>
            <div className="grid gap-2">
              <label className={labelClassName} htmlFor="deadline">
                Deadline
              </label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                className={inputClassName}
                defaultValue={briefingDefaults.deadline}
              />
            </div>
            <div className="grid gap-2 md:col-span-3">
              <label className={labelClassName} htmlFor="constraints">
                Constraints
              </label>
              <textarea
                id="constraints"
                name="constraints"
                rows={3}
                className={inputClassName}
                defaultValue={briefingDefaults.constraints}
              />
            </div>
            <div className="grid gap-2 md:col-span-3">
              <label className={labelClassName} htmlFor="raw-notes">
                Internal notes
              </label>
              <textarea
                id="raw-notes"
                name="rawNotes"
                rows={3}
                className={inputClassName}
                defaultValue={briefingDefaults.rawNotes}
              />
            </div>
          </div>
        </section>

        <div className="pf-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p id="mock-save-note" className="max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
            Preview mode only. This button is intentionally disabled because the portfolio demo does
            not write to SQLite, an API or a hosted database.
          </p>
          <button
            type="button"
            disabled
            aria-describedby="mock-save-note"
            className="min-h-11 rounded-md border border-[var(--line)] bg-[var(--soft)] px-4 py-2 text-sm font-black text-[color:var(--muted)]"
          >
            Mock preview only
          </button>
        </div>
      </form>
    </DashboardShell>
  );
}
