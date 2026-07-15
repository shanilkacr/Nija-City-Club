import type { ReactNode } from "react";

/**
 * Marketing route group — public pages share root MegaMenu / Footer.
 * Kept as a group so private / member portals can sit beside it later.
 */
export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
