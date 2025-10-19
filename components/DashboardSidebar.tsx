// components/DashboardSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Cloud, FileText, Home, LucideIcon } from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  {
    name: "Input Data Kejadian",
    href: "/dashboard/input-kejadian",
    icon: FileText,
  },
  { name: "Update Data Cuaca", href: "/dashboard/update-cuaca", icon: Cloud },
];

interface DashboardSidebarProps {
  onLinkClick?: () => void;
}

export default function DashboardSidebar({
  onLinkClick,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="h-full bg-white border-r">
      <div className="pt-16">
        <nav className="mt-5 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onLinkClick}
                className={cn(
                  "group flex items-center px-4 sm:px-6 lg:px-8 py-2 text-sm font-medium rounded-md transition-colors",
                  "text-gray-700 hover:text-disaster-orange hover:bg-disaster-orange/10",
                  isActive && "text-disaster-orange bg-disaster-orange/10"
                )}
              >
                <Icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    "text-gray-400 group-hover:text-disaster-orange",
                    isActive && "text-disaster-orange"
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
