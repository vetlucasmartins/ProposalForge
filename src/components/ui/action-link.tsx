import Link from "next/link";
import type { Route } from "next";

type ActionLinkProps<T extends string> = {
  href: Route<T>;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function ActionLink<T extends string>({
  href,
  children,
  variant = "primary",
}: ActionLinkProps<T>) {
  const variantClassName =
    variant === "primary"
      ? "bg-[var(--ink)] hover:bg-[var(--accent)]"
      : "border border-[var(--line)] bg-[var(--surface)] text-[color:var(--ink)] hover:border-[var(--accent)]";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors ${variantClassName}`}
      style={variant === "primary" ? { color: "var(--surface)" } : undefined}
    >
      {children}
    </Link>
  );
}
