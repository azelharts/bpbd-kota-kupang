// components/DashboardNavbar.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { LogOut, Menu, X } from "lucide-react";

interface DashboardNavbarProps {
  username?: string;
  onLogout: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function DashboardNavbar({
  username = "Admin",
  onLogout,
  isSidebarOpen,
  onToggleSidebar,
}: DashboardNavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-[100] print:hidden">
      <div className="max-w-screen-2xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="text-gray-600 hover:text-gray-900 lg:hidden"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
            <Link href="/" className="flex items-center space-x-3 ml-4 lg:ml-0">
              <div className="w-10 h-10 flex items-center justify-center relative">
                <Image
                  src="/assets/logo-bpbd.png"
                  fill
                  alt="logo bpbd"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h1 className="text-lg font-bold text-gray-900">BPBD</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{username}</span>
            <Button
              variant="ghost"
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-700 transition hover:text-disaster-orange hover:bg-disaster-orange/10"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
