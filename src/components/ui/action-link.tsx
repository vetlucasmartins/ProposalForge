import Link from "next/link";
import type { Route } from "next";

type ActionLinkProps = {
  href: Route;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function ActionLink({ href, children, variant = "primary" }: ActionLinkProps) {
  const variantClassName = variant === "primary" ? "pf-action-primary" : "pf-action-secondary";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold ${variantClassName}`}
    >
      {children}
    </Link>
  );
}
