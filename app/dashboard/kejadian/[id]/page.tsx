"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

type Kejadian = Record<string, any>;

export default function ViewKejadianPage() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const [data, setData] = useState<Kejadian | null>(null);

  useEffect(() => {
    fetch(`/api/kejadian/${params.id}`)
      .then((r) => r.json())
      .then(setData);
  }, [params.id]);

  if (!data)
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button
          size="sm"
          onClick={() => router.push(`/dashboard/kejadian/${data.id}/edit`)}
        >
          <Edit className="w-4 h-4 mr-2" /> Edit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detail Kejadian</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <Row label="Nama Kejadian" val={data.nama.join(", ")} />
          <Row label="Jenis" val={data.jenis.join(", ")} />
          <Row label="Tanggal" val={format(new Date(data.tanggal), "PPP")} />
          <Row label="Waktu" val={data.waktu} />
          <Row label="Kecamatan" val={data.kecamatan.join(", ")} />
          <Row label="Kelurahan" val={data.kelurahan.join(", ")} />
          <Row label="Letak Geografis" val={data.geografis} />
          <Row label="Sebab" val={data.sebab} />
          <Row label="Kronologis" val={data.kronologis} />
          <Row label="Deskripsi" val={data.deskripsi} />
          <Row label="Status Darurat" val={data.statusDarurat} />
          {data.fotoUrl && (
            <Row
              label="Foto"
              val={
                <img
                  src={data.fotoUrl}
                  alt="Foto kejadian"
                  className="w-full max-w-md rounded"
                />
              }
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, val }: { label: string; val: React.ReactNode }) {
  if (!val) return null;
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="text-gray-900">{val}</span>
    </div>
  );
}
