import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
