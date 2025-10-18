"use client";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cloud, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Latest = { id: string; nama: string[]; createdAt: string };

export default function DashboardHome() {
  const [total, setTotal] = useState<number>(0);
  const [latest, setLatest] = useState<Latest[]>([]);

  useEffect(() => {
    fetch("/api/kejadian/count")
      .then((r) => r.json())
      .then((d) => setTotal(d.total));
    fetch("/api/kejadian/latest")
      .then((r) => r.json())
      .then(setLatest);
  }, []);

  const stats = [
    {
      title: "Data Kejadian & Dampak Bencana",
      value: String(total),
      description: "Total kejadian bencana tercatat",
      icon: FileText,
      color: "bg-disaster-orange",
      href: "/dashboard/kejadian",
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

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/dashboard"
              className="text-disaster-orange font-medium"
            >
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard BPBD Kota Kupang</CardTitle>
          <CardDescription>
            Selamat datang di sistem informasi kebencanaan SIncan-KotaKu
          </CardDescription>
        </CardHeader>
      </Card>

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

      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {latest.map((l) => (
              <div
                key={l.id}
                className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    Input: {l.nama.join(", ")}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {new Date(l.createdAt).toLocaleString("id-ID")}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Selesai
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
