// app/dashboard/input-kejadian/page.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import KejadianForm from "./KejadianForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function InputKejadianPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage className="text-disaster-orange font-medium">
            Input Data Kejadian
          </BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="!border-none !shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="bg-disaster-orange text-white p-2 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-2xl font-bold text-gray-900">
                Input Data Kejadian
              </span>
              <span className="text-gray-600 font-normal">
                Formulir pelaporan kejadian bencana alam
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <KejadianForm />
        </CardContent>
      </Card>
    </div>
  );
}
