import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
