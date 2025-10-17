// app/api/kejadian/latest/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const rows = await prisma.kejadian.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, nama: true, tanggal: true, createdAt: true },
  });
  return NextResponse.json(rows);
}
