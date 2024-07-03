'use client'
import { AuthProvider } from "@/components/auth-provider";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

export type LayoutWrapperProps = {
  children: React.ReactNode;
  currentGroup: any;
  currentSession: any;
};

export default function LayoutWrapper({
  children,
  currentGroup,
  currentSession,
}: LayoutWrapperProps) {
  return (
    <AuthProvider currentGroup={currentGroup} currentSession={currentSession}>
      <div className="min-h-screen w-full flex justify-center mx-auto bg-slate-100">
        <div className="w-full">
          <Sidebar />
          <div className="flex ml-64 flex-grow">
            <Header />
            <main className="mt-16 px-8 py-4 flex-1">{children}</main>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
