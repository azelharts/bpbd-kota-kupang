"use client";

import React from "react";
import { FileText, Cloud } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardHome() {
  const stats = [
    {
      title: "Data Kejadian & Dampak Bencana",
      value: "24",
      description: "Total kejadian bencana tahun ini",
      icon: FileText,
      color: "bg-disaster-orange",
      href: "/dashboard/input-kejadian",
    },
    {
      title: "Data Prakiraan Cuaca",
      value: "7",
      description: "Hari prakiraan cuaca aktif",
      icon: Cloud,
      color: "bg-disaster-orange",
      href: "/dashboard/update-cuaca",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "kejadian",
      title: "Update Data Banjir Jakarta",
      timestamp: "2 jam yang lalu",
      status: "success",
    },
    {
      id: 2,
      type: "cuaca",
      title: "Perbarui Prakiraan Cuaca Mingguan",
      timestamp: "5 jam yang lalu",
      status: "success",
    },
    {
      id: 3,
      type: "kejadian",
      title: "Input Data Tanah Longsor Bandung",
      timestamp: "1 hari yang lalu",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-disaster-orange font-medium">
              Beranda
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard BPBD Kota Kupang</CardTitle>
          <CardDescription>
            Selamat datang di sistem informasi kebencanaan SIncan-KotaKu
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={`${stat.color} rounded-lg p-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                </div>
                <CardTitle className="text-lg">{stat.title}</CardTitle>
                <CardDescription>{stat.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={stat.href}
                  className="inline-flex items-center text-disaster-orange hover:text-disaster-orange-dark font-medium transition-colors"
                >
                  Lihat Detail
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/dashboard/input-kejadian"
              className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors"
            >
              <FileText className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-orange-700 font-medium">
                Input Data Kejadian
              </span>
            </Link>
            <Link
              href="/dashboard/update-cuaca"
              className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors"
            >
              <Cloud className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-orange-700 font-medium">
                Update Data Cuaca
              </span>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.status === "success"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
                <Badge
                  variant={
                    activity.status === "success" ? "default" : "secondary"
                  }
                  className={
                    activity.status === "success"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                >
                  {activity.status === "success" ? "Selesai" : "Dalam Proses"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
