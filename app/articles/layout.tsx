import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
};

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
