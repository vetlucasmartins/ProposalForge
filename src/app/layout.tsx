import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ProposalForge",
    template: "%s | ProposalForge",
  },
  description:
    "ProposalForge is a public portfolio mockup for turning a client brief into a structured commercial proposal preview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
