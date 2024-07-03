import { getGroup, getSession } from "@/api/authorization";
import LayoutWrapper from "@/components/layout-wrapper";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const group = await getGroup();

  return (
    <LayoutWrapper currentGroup={group} currentSession={session}>
      {children}
    </LayoutWrapper>
  );
}
