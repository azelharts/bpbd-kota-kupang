// app/api/cuaca/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary, destroyFromCloudinary } from "@/lib/cloudinary";

// GET - Fetch cuaca data
export async function GET() {
  try {
    const cuaca = await prisma.cuaca.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(cuaca);
  } catch (error) {
    console.error("Error fetching cuaca:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new cuaca data (first time)
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const namaPrakiraan = formData.get("namaPrakiraan") as string;
    const foto = formData.get("foto") as File | null;

    if (!namaPrakiraan) {
      return NextResponse.json(
        { error: "Nama prakiraan is required" },
        { status: 400 }
      );
    }

    // Check if cuaca data already exists
    const existingCuaca = await prisma.cuaca.findFirst();
    if (existingCuaca) {
      return NextResponse.json(
        { error: "Cuaca data already exists. Use PUT to update." },
        { status: 409 }
      );
    }

    // Handle image upload
    let fotoUrl: string | null = null;
    if (foto && foto.size > 0) {
      fotoUrl = await uploadToCloudinary(foto);
    }

    // Create new cuaca record
    const cuaca = await prisma.cuaca.create({
      data: {
        namaPrakiraan,
        fotoUrl,
        tanggalUpdate: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: cuaca,
    });
  } catch (error) {
    console.error("Error creating cuaca:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update existing cuaca data
export async function PUT(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const namaPrakiraan = formData.get("namaPrakiraan") as string;
    const foto = formData.get("foto") as File | null;

    if (!namaPrakiraan) {
      return NextResponse.json(
        { error: "Nama prakiraan is required" },
        { status: 400 }
      );
    }

    // Get existing cuaca data
    const existingCuaca = await prisma.cuaca.findFirst();

    if (!existingCuaca) {
      return NextResponse.json(
        { error: "No cuaca data found. Use POST to create." },
        { status: 404 }
      );
    }

    let fotoUrl: string | null = existingCuaca.fotoUrl;

    // Handle image upload
    if (foto && foto.size > 0) {
      // Delete old image from Cloudinary if it exists
      if (existingCuaca.fotoUrl) {
        try {
          await destroyFromCloudinary(existingCuaca.fotoUrl);
        } catch (error) {
          console.error("Error deleting old image:", error);
          // Continue even if deletion fails
        }
      }

      // Upload new image
      fotoUrl = await uploadToCloudinary(foto);
    }

    // Update existing record
    const cuaca = await prisma.cuaca.update({
      where: { id: existingCuaca.id },
      data: {
        namaPrakiraan,
        fotoUrl,
        tanggalUpdate: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: cuaca,
    });
  } catch (error) {
    console.error("Error updating cuaca:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
