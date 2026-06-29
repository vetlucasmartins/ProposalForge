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
      <header className="border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link href="/" className="text-lg font-bold text-[color:var(--ink)]">
            ProposalForge
          </Link>
          <nav aria-label="Dashboard navigation" className="flex flex-wrap gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-11 rounded-md px-3 py-2 text-sm font-medium text-[color:var(--muted)] transition-colors hover:bg-[var(--soft)] hover:text-[color:var(--ink)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
