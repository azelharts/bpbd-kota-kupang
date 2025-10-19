// app/api/kejadian/count/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const total = await prisma.kejadian.count();
  return NextResponse.json({ total });
}
