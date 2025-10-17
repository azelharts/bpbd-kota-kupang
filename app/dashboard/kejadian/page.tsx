"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

type Kejadian = {
  id: string;
  nama: string[];
  tanggal: string;
  createdAt: string;
};

export default function KejadianPage() {
  const [data, setData] = useState<Kejadian[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    const res = await fetch("/api/kejadian");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hapus = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    const res = await fetch(`/api/kejadian/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Data dihapus");
      fetchData();
    } else toast.error("Gagal menghapus");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Daftar Kejadian Bencana</h1>
        <Button onClick={() => router.push("/dashboard/input-kejadian")}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Kejadian
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Kejadian</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Dibuat</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((k) => (
            <TableRow key={k.id}>
              <TableCell>{k.nama.join(", ")}</TableCell>
              <TableCell>{format(new Date(k.tanggal), "dd/MM/yyyy")}</TableCell>
              <TableCell>
                {format(new Date(k.createdAt), "dd/MM/yyyy HH:mm")}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push(`/dashboard/kejadian/${k.id}`)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/kejadian/${k.id}/edit`)
                  }
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => hapus(k.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
