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
  sebab: z.string(),
  kronologis: z.string(),
  deskripsi: z.string(),
  sumber: z.string(),
  kondisi: z.string(),
  status_darurat: z.string().min(1, "Status darurat wajib diisi"),
  upaya: z.string(),
  sebaran: z.string(),
  kib: z.string(),
  dana: numeric,
  sdm: z.string(),
  sarpras: z.string(),
  logistik: z.string(),
  alat: z.string(),
  layanan: z.string(),
  foto: z.instanceof(File).optional(),
});

/* ---------- dynamically add every numeric field ---------- */
export const formSchema = baseSchema.extend(
  Object.fromEntries(numericFields.map((f) => [f, numeric])) as Record<
    (typeof numericFields)[number],
    typeof numeric
  >
);

export type FormValues = z.infer<typeof formSchema>;
