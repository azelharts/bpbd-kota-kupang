// app/dashboard/kejadian/[id]/page.tsx

"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FormValues } from "@/lib/schemas/kejadian-schema";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import KejadianForm from "../../input-kejadian/KejadianForm";

export default function ViewEditKejadianPage() {
  const params = useParams() as { id: string };
  const router = useRouter();
  const [initial, setInitial] = useState<FormValues | null>(null);

  useEffect(() => {
    fetch(`/api/kejadian/${params.id}`)
      .then((r) => r.json())
      .then((d) =>
        setInitial({
          ...d,
          tanggal: new Date(d.tanggal),
        })
      );
  }, [params.id]);

  if (!initial)
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-96 w-full" />
      </div>
    );

  const hapus = async () => {
    if (!confirm("Yakin ingin menghapus kejadian ini?")) return;
    const res = await fetch(`/api/kejadian/${params.id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Kejadian dihapus");
      router.push("/dashboard/kejadian");
    } else toast.error("Gagal menghapus");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/kejadian">
              Daftar Kejadian Bencana
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage className="text-disaster-orange font-medium">
            {params.id}
          </BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Kejadian</h1>
        <Button variant="destructive" size="sm" onClick={hapus}>
          <Trash className="w-4 h-4 mr-2" /> Hapus Kejadian
        </Button>
      </div>

      <Card className="py-6">
        <KejadianForm initialData={initial} />
      </Card>
    </div>
  );
}
