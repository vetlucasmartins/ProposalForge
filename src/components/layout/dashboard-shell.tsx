import Link from "next/link";

type DashboardShellProps = {
  children: React.ReactNode;
};

const navigationItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/proposals/new", label: "New proposal" },
] as const;

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-dvh bg-[var(--background)] text-[color:var(--foreground)]">
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[rgba(238,241,235,0.84)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-lg font-bold text-[color:var(--ink)]"
          >
            ProposalForge
          </Link>
          <nav aria-label="Dashboard navigation" className="flex flex-wrap gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="pf-nav-link inline-flex min-h-11 items-center px-3 py-2 text-sm font-semibold text-[color:var(--muted)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">{children}</main>
    </div>
  );
}
