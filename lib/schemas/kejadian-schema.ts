// lib/schemas/kejadian-schema.ts
import { z } from "zod";
import { numericFields } from "@/constants/kejadian";

const numeric = z.string().refine((v) => v === "" || !Number.isNaN(Number(v)), {
  message: "Harus angka",
});

/* ---------- base shape that contains every field that exists in the DB ---------- */
const baseSchema = z.object({
  nama: z.array(z.string()).min(1, "Nama kejadian wajib dipilih"),
  jenis: z.array(z.string()).min(1, "Jenis kejadian wajib dipilih"),
  tanggal: z.date({ error: "Tanggal wajib diisi" }),
  waktu: z.string().min(1, "Waktu wajib diisi"),
  provinsi: z.string().min(1, "Provinsi wajib dipilih"),
  kabkota: z.string().min(1, "Kab/Kota wajib dipilih"),
  kecamatan: z.array(z.string()).min(1, "Kecamatan wajib dipilih"),
  kelurahan: z.array(z.string()).min(1, "Kelurahan wajib dipilih"),
  geografis: z.string().min(1, "Letak geografis wajib diisi"),
  sebab: z.string().min(1, "Sebab kejadian wajib diisi"),
  kronologis: z.string().min(1, "Kronologis kejadian wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi kejadian wajib diisi"),
  sumber: z.string().min(1, "Sumber informasi wajib diisi"),
  kondisi: z.string().min(1, "Kondisi mutakhir wajib diisi"),
  statusDarurat: z.string().min(1, "Status darurat wajib diisi"),
  upaya: z.string().min(1, "Upaya wajib diisi"),
  sebaran: z.string().min(1, "Sebaran dampak wajib diisi"),
  foto: z.instanceof(File).optional(),
  kib: z.string().min(1, "KIB wajib diisi"),
  dana: z
    .number({ error: "Dana harus berupa angka" })
    .min(1, "Dana wajib diisi"),
  sdm: z.string().min(1, "SDM wajib diisi"),
  sarpras: z.string().min(1, "Sarana-prasarana wajib diisi"),
  logistik: z.string().min(1, "Logistik wajib diisi"),
  alat: z.string().min(1, "Alat wajib diisi"),
  layanan: z.string().min(1, "Layanan wajib diisi"),
});

/* ---------- dynamically add every numeric field ---------- */
export const formSchema = baseSchema.extend(
  Object.fromEntries(numericFields.map((f) => [f, numeric])) as Record<
    (typeof numericFields)[number],
    typeof numeric
  >
);

export type FormValues = z.infer<typeof formSchema>;
