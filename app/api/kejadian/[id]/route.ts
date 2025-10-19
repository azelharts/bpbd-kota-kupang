// app/api/kejadian/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { destroyFromCloudinary } from "@/lib/cloudinary";

// GET - Fetch single kejadian data
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const row = await prisma.kejadian.findUnique({ where: { id } });
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
}

// PUT - Edit single kejadian data
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData = await req.formData();

  const nama = JSON.parse(formData.get("nama") as string);
  const jenis = JSON.parse(formData.get("jenis") as string);
  const kecamatan = JSON.parse(formData.get("kecamatan") as string);
  const kelurahan = JSON.parse(formData.get("kelurahan") as string);

  const data: Record<string, unknown> = {
    nama,
    jenis,
    tanggal: new Date(formData.get("tanggal") as string),
    waktu: formData.get("waktu") as string,
    provinsi: formData.get("provinsi") as string,
    kabkota: formData.get("kabkota") as string,
    kecamatan,
    kelurahan,
    geografis: formData.get("geografis") as string,
    sebab: (formData.get("sebab") as string) || null,
    kronologis: (formData.get("kronologis") as string) || null,
    deskripsi: (formData.get("deskripsi") as string) || null,
    sumber: (formData.get("sumber") as string) || null,
    kondisi: (formData.get("kondisi") as string) || null,
    statusDarurat: formData.get("statusDarurat") as string,
    upaya: (formData.get("upaya") as string) || null,
    sebaran: (formData.get("sebaran") as string) || null,
    kib: (formData.get("kib") as string) || null,
    dana: (formData.get("dana") as string) || null,
    sdm: (formData.get("sdm") as string) || null,
    sarpras: (formData.get("sarpras") as string) || null,
    logistik: (formData.get("logistik") as string) || null,
    alat: (formData.get("alat") as string) || null,
    layanan: (formData.get("layanan") as string) || null,
  };

  // Add every numeric field
  numericFields.forEach((f) => (data[f] = formData.get(f) as string) || null);

  // Handle new photo if uploaded
  const foto = formData.get("foto") as File | null;
  if (foto) {
    // Fetch existing record to get current fotoUrl
    const existing = await prisma.kejadian.findUnique({
      where: { id },
      select: { fotoUrl: true },
    });

    // Delete old image from Cloudinary if it exists
    if (existing?.fotoUrl) {
      await destroyFromCloudinary(existing.fotoUrl);
    }

    // Upload new image
    data.fotoUrl = await uploadToCloudinary(foto);
  }

  const updated = await prisma.kejadian.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated);
}

// DELETE - delete single kejadian data
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const row = await prisma.kejadian.findUnique({
    where: { id },
    select: { fotoUrl: true },
  });

  // Delete image from Cloudinary if exists
  if (row?.fotoUrl) await destroyFromCloudinary(row.fotoUrl);

  // Delete record from DB
  await prisma.kejadian.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

// Helpers
import { numericFields } from "@/constants/kejadian";
import { uploadToCloudinary } from "@/lib/cloudinary";
