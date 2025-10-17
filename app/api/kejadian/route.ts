// app/api/kejadian/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    // Parse arrays from JSON strings
    const nama = JSON.parse(formData.get("nama") as string);
    const jenis = JSON.parse(formData.get("jenis") as string);
    const kecamatan = JSON.parse(formData.get("kecamatan") as string);
    const kelurahan = JSON.parse(formData.get("kelurahan") as string);

    // Handle image upload
    let fotoUrl: string | null = null;
    const foto = formData.get("foto") as File | null;
    if (foto) {
      fotoUrl = await uploadToCloudinary(foto);
    }

    // Extract all form fields
    const data = {
      // B.1 Data Kejadian Bencana
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
      statusDarurat: formData.get("status_darurat") as string,
      upaya: (formData.get("upaya") as string) || null,
      sebaran: (formData.get("sebaran") as string) || null,
      fotoUrl,
      kib: (formData.get("kib") as string) || null,

      // B.2 Data Kebutuhan Bencana
      dana: (formData.get("dana") as string) || null,
      sdm: (formData.get("sdm") as string) || null,
      sarpras: (formData.get("sarpras") as string) || null,
      logistik: (formData.get("logistik") as string) || null,
      alat: (formData.get("alat") as string) || null,

      // B.3-B.7 All numeric fields
      aml: (formData.get("aml") as string) || null,
      amp: (formData.get("amp") as string) || null,
      dwsml: (formData.get("dwsml") as string) || null,
      dwsmp: (formData.get("dwsmp") as string) || null,
      lnml: (formData.get("lnml") as string) || null,
      lnmp: (formData.get("lnmp") as string) || null,
      tml: (formData.get("tml") as string) || null,
      tmp: (formData.get("tmp") as string) || null,
      ahl: (formData.get("ahl") as string) || null,
      ahp: (formData.get("ahp") as string) || null,
      dwshl: (formData.get("dwshl") as string) || null,
      dwshp: (formData.get("dwshp") as string) || null,
      lnhl: (formData.get("lnhl") as string) || null,
      lnhp: (formData.get("lnhp") as string) || null,
      thl: (formData.get("thl") as string) || null,
      thp: (formData.get("thp") as string) || null,
      alkl: (formData.get("alkl") as string) || null,
      alkp: (formData.get("alkp") as string) || null,
      dwsll: (formData.get("dwsll") as string) || null,
      dwslp: (formData.get("dwslp") as string) || null,
      lnll: (formData.get("lnll") as string) || null,
      lnlp: (formData.get("lnlp") as string) || null,
      tll: (formData.get("tll") as string) || null,
      tlp: (formData.get("tlp") as string) || null,
      atl: (formData.get("atl") as string) || null,
      atp: (formData.get("atp") as string) || null,
      dwstl: (formData.get("dwstl") as string) || null,
      dwstp: (formData.get("dwstp") as string) || null,
      lntl: (formData.get("lntl") as string) || null,
      lntp: (formData.get("lntp") as string) || null,
      ttl: (formData.get("ttl") as string) || null,
      ttp: (formData.get("ttp") as string) || null,
      aul: (formData.get("aul") as string) || null,
      aup: (formData.get("aup") as string) || null,
      dwsul: (formData.get("dwsul") as string) || null,
      dwsup: (formData.get("dwsup") as string) || null,
      lnul: (formData.get("lnul") as string) || null,
      lnup: (formData.get("lnup") as string) || null,
      tul: (formData.get("tul") as string) || null,
      tup: (formData.get("tup") as string) || null,

      // B.4 Pertanian
      sawah: (formData.get("sawah") as string) || null,
      txsawah: (formData.get("txsawah") as string) || null,
      lahan: (formData.get("lahan") as string) || null,
      txlahan: (formData.get("txlahan") as string) || null,
      kebun: (formData.get("kebun") as string) || null,
      txkebun: (formData.get("txkebun") as string) || null,
      hutan: (formData.get("hutan") as string) || null,
      txhutan: (formData.get("txhutan") as string) || null,
      kolam: (formData.get("kolam") as string) || null,
      txkolam: (formData.get("txkolam") as string) || null,

      // B.4 Kios & Pabrik
      kb: (formData.get("kb") as string) || null,
      ks: (formData.get("ks") as string) || null,
      kr: (formData.get("kr") as string) || null,
      ktrd: (formData.get("ktrd") as string) || null,
      txkios: (formData.get("txkios") as string) || null,
      pb: (formData.get("pb") as string) || null,
      ps: (formData.get("ps") as string) || null,
      pr: (formData.get("pr") as string) || null,
      ptrd: (formData.get("ptrd") as string) || null,
      txpabrik: (formData.get("txpabrik") as string) || null,

      // B.5 Prasarana
      txair: (formData.get("txair") as string) || null,
      txlampu: (formData.get("txlampu") as string) || null,
      txkom: (formData.get("txkom") as string) || null,
      txiri: (formData.get("txiri") as string) || null,
      txjln: (formData.get("txjln") as string) || null,
      txtrans: (formData.get("txtrans") as string) || null,
      txbbm: (formData.get("txbbm") as string) || null,
      jb: (formData.get("jb") as string) || null,
      js: (formData.get("js") as string) || null,
      jr: (formData.get("jr") as string) || null,
      jtrd: (formData.get("jtrd") as string) || null,
      txjembatan: (formData.get("txjembatan") as string) || null,

      // B.6 Rumah
      rmhb: (formData.get("rmhb") as string) || null,
      rmhs: (formData.get("rmhs") as string) || null,
      rmhr: (formData.get("rmhr") as string) || null,
      rmhtrd: (formData.get("rmhtrd") as string) || null,
      txrmh: (formData.get("txrmh") as string) || null,

      // B.7 Pelayanan Dasar
      skob: (formData.get("skob") as string) || null,
      skos: (formData.get("skos") as string) || null,
      skor: (formData.get("skor") as string) || null,
      skotrd: (formData.get("skotrd") as string) || null,
      txsko: (formData.get("txsko") as string) || null,
      rib: (formData.get("rib") as string) || null,
      ris: (formData.get("ris") as string) || null,
      rir: (formData.get("rir") as string) || null,
      ritrd: (formData.get("ritrd") as string) || null,
      txri: (formData.get("txri") as string) || null,
      faskesb: (formData.get("faskesb") as string) || null,
      faskess: (formData.get("faskess") as string) || null,
      faskesr: (formData.get("faskesr") as string) || null,
      faskestrd: (formData.get("faskestrd") as string) || null,
      txfaskes: (formData.get("txfaskes") as string) || null,
      ktrb: (formData.get("ktrb") as string) || null,
      ktrs: (formData.get("ktrs") as string) || null,
      ktrr: (formData.get("ktrr") as string) || null,
      ktrtrd: (formData.get("ktrtrd") as string) || null,
      txktr: (formData.get("txktr") as string) || null,
      psrb: (formData.get("psrb") as string) || null,
      psrs: (formData.get("psrs") as string) || null,
      psrr: (formData.get("psrr") as string) || null,
      psrtrd: (formData.get("psrtrd") as string) || null,
      txpsr: (formData.get("txpsr") as string) || null,

      // B.8 Layanan
      layanan: (formData.get("layanan") as string) || null,
    };

    // Save to database
    const kejadian = await prisma.kejadian.create({
      data,
    });

    return NextResponse.json({
      success: true,
      data: kejadian,
    });
  } catch (error) {
    console.error("Error creating kejadian:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const rows = await prisma.kejadian.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(rows);
}
