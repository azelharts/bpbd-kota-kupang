"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/* ---------- import the SAME giant form ---------- */
import InputKejadianPage from "@/app/dashboard/input-kejadian/page";
import { FormValues } from "@/lib/schemas/kejadian-schema";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ViewEditKejadianPage() {
  const params = useParams() as { id: string };
  const router = useRouter();
  const [initial, setInitial] = useState<FormValues | null>(null);

  /* ---------- load once ---------- */
  useEffect(() => {
    fetch(`/api/kejadian/${params.id}`)
      .then((r) => r.json())
      .then((d) =>
        setInitial({
          ...d,
          tanggal: new Date(d.tanggal), // string -> Date
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

  /* ---------- delete handler ---------- */
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

      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Kejadian</h1>
        <Button variant="destructive" size="sm" onClick={hapus}>
          <Trash className="w-4 h-4 mr-2" /> Hapus Kejadian
        </Button>
      </div>

      {/* the full input form, now in EDIT mode */}
      <Card className="py-6">
        <InputKejadianPage initialData={initial} />
      </Card>
    </div>
  );
}
