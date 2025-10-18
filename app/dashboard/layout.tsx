"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-disaster-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen overflow-x-hidden">
      {/* Top Navigation - Sticky */}
      <DashboardNavbar
        username={session?.user?.username}
        onLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex max-w-screen-2xl mx-auto">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block lg:w-64 lg:fixed lg:h-screen z-50">
          <DashboardSidebar />
        </div>

        {/* Sidebar - Mobile */}
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/50  w-full opacity-75 lg:hidden"
              onClick={closeSidebar}
            ></div>

            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg lg:hidden">
              <DashboardSidebar onLinkClick={closeSidebar} />
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="pt-20 pb-4 px-4 lg:pl-72 lg:pr-8 z-30 w-full h-full">
          {children}
        </main>
      </div>
    </div>
  );
}
