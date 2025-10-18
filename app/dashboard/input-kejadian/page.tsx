"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, FileText, UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  jenisList,
  kecList,
  kelList,
  namaList,
  numericDefaults,
} from "@/constants/kejadian";
import { formSchema, FormValues } from "@/lib/schemas/kejadian-schema";
import { useRouter } from "next/navigation";
import { MultiSelect } from "./MultiSelect";
import {
  JembatanTable,
  ManusiaTable,
  PelayananTable,
  PrasaranaTable,
  RumahTable,
  RusakKiosPabrikTable,
  RusakPertanianTable,
} from "./tables";

export default function InputKejadianPage({
  initialData,
}: { initialData?: any } = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? {
      provinsi: "Nusa Tenggara Timur",
      kabkota: "Kota Kupang",
      waktu: "",
      nama: [] as string[],
      jenis: [] as string[],
      kecamatan: [] as string[],
      kelurahan: [] as string[],
      geografis: "",
      sebab: "",
      kronologis: "",
      deskripsi: "",
      sumber: "",
      kondisi: "",
      statusDarurat: "",
      upaya: "",
      sebaran: "",
      kib: "",
      dana: "",
      sdm: "",
      sarpras: "",
      logistik: "",
      alat: "",
      layanan: "",
      ...numericDefaults,
    },
  });

  // Set initial preview if editing existing data
  useEffect(() => {
    if (initialData?.fotoUrl) {
      setPreviewUrl(initialData.fotoUrl);
    }
  }, [initialData]);

  // Handle file selection and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Clear image preview
  const clearImage = () => {
    setFile(null);
    setPreviewUrl("");
  };

  async function onSubmit(values: FormValues) {
    try {
      const body = new FormData();
      Object.entries(values).forEach(([k, v]) => {
        if (k === "foto") {
          if (file) body.append("foto", file);
        } else if (Array.isArray(v)) {
          body.append(k, JSON.stringify(v));
        } else if ((v as any) instanceof Date) {
          body.append(k, format(v, "yyyy-MM-dd"));
        } else {
          body.append(k, String(v ?? ""));
        }
      });

      const url = initialData
        ? `/api/kejadian/${initialData.id}`
        : "/api/kejadian";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, { method, body });
      if (!res.ok) throw new Error("Gagal menyimpan");

      toast.success(initialData ? "Data diperbarui!" : "Data tersimpan!");
      router.push("/dashboard/kejadian");
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  }

  return (
    <div className="mx-auto space-y-6">
      {/* Breadcrumb */}
      {!initialData && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage className="text-disaster-orange font-medium">
              Input Data Kejadian
            </BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <Card className="border-none shadow-none">
        {!initialData && (
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="bg-disaster-orange text-white p-2 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="text-2xl font-bold text-gray-900">
                  Input Data Kejadian
                </span>
                <span className="text-gray-600 font-normal">
                  Formulir pelaporan kejadian bencana alam
                </span>
              </div>
            </CardTitle>
          </CardHeader>
        )}

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* ---------- B.1 ---------- */}
              <Card>
                <CardHeader>
                  <CardTitle>B.1 Data Kejadian Bencana</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 overflow-x-scroll">
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>1. Nama Kejadian</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={namaList}
                            onChange={field.onChange}
                            defaultValue={initialData && field.value}
                            placeholder="Ketik / pilih"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jenis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>2. Jenis Kejadian</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={jenisList}
                            onChange={field.onChange}
                            defaultValue={initialData && field.value}
                            placeholder="Ketik / pilih"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tanggal"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>3. Tanggal Kejadian</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pilih tanggal</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={initialData && field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="waktu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>4. Waktu Kejadian</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="provinsi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provinsi</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Nusa Tenggara Timur">
                              Nusa Tenggara Timur
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kabkota"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kabupaten/Kota</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Kota Kupang">
                              Kota Kupang
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kecamatan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kecamatan</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={kecList}
                            onChange={field.onChange}
                            defaultValue={initialData && field.value}
                            placeholder="Ketik / pilih"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kelurahan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kelurahan</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={kelList}
                            onChange={field.onChange}
                            defaultValue={initialData && field.value}
                            placeholder="Ketik / pilih"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="geografis"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Letak Geografis</FormLabel>
                        <FormControl>
                          <Input placeholder="-10.123, 123.456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sebab"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>5. Sebab Kejadian</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            placeholder="Penyebab …"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kronologis"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>6. Kronologis Kejadian</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deskripsi"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>7. Deskripsi Kejadian</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>8. Sumber Informasi</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kondisi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>9. Kondisi Mutakhir</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="statusDarurat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>10. Status Darurat</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="upaya"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>11. Upaya</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sebaran"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>12. Sebaran Dampak</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="foto"
                    render={() => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>13. Foto</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <Label className="cursor-pointer">
                                <div className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent">
                                  <UploadCloud className="w-4 h-4" />
                                  <span>Pilih file</span>
                                </div>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  onChange={handleFileChange}
                                />
                              </Label>
                              {file && <Badge>{file.name}</Badge>}
                            </div>

                            {/* Image Preview */}
                            {previewUrl && (
                              <div className="relative w-full">
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="w-full h-auto rounded-lg border shadow-sm"
                                />
                                {!initialData && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2"
                                    onClick={clearImage}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Maks. 5 MB (jpg/png/gif)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kib"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>14. Kode Identitas Bencana (KIB)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* ---------- B.2 ---------- */}
              <Card>
                <CardHeader>
                  <CardTitle>B.2 Data Kebutuhan Bencana</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  {(
                    ["dana", "sdm", "sarpras", "logistik", "alat"] as const
                  ).map((key) => (
                    <FormField
                      key={key}
                      control={form.control}
                      name={key}
                      render={({ field }) => (
                        <FormItem
                          className={key === "alat" ? "md:col-span-2" : ""}
                        >
                          <FormLabel>
                            {key === "dana" && "1. Dana (Juta)"}
                            {key === "sdm" && "2. Sumber Daya Manusia"}
                            {key === "sarpras" && "3. Sarana Prasarana"}
                            {key === "logistik" && "4. Logistik"}
                            {key === "alat" && "5. Peralatan"}
                          </FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </CardContent>
              </Card>

              {/* ---------- B.3 – B.7  (tables) ---------- */}
              <Card>
                <CardHeader>
                  <CardTitle>B.3 Data Akibat Terhadap Manusia</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-scroll">
                  <ManusiaTable form={form} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    B.4 Data Kerusakan dan Kerugian Sosial Ekonomi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 overflow-x-scroll">
                  <RusakPertanianTable form={form} />
                  <RusakKiosPabrikTable form={form} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    B.5 Data Kerusakan dan Kerugian Prasarana & Sarana Vital
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 overflow-x-scroll">
                  <PrasaranaTable form={form} />
                  <JembatanTable form={form} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>B.6 Data Kerusakan dan Kerugian Rumah</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-scroll">
                  <RumahTable form={form} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    B.7 Data Kerusakan dan Kerugian Pelayanan Dasar
                  </CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-scroll">
                  <PelayananTable form={form} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    B.8 Data Aset dan Layanan Penanganan Kedaruratan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="layanan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Barang yang digunakan untuk melayani penanganan
                          darurat bencana
                        </FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* ---------- Actions ---------- */}
              <div className="flex justify-end flex-wrap gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setFile(null);
                    setPreviewUrl("");
                  }}
                >
                  {initialData ? "Batalkan Perubahan" : "Reset Form"}
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-disaster-orange"
                >
                  {form.formState.isSubmitting && (
                    <span className="mr-2 w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
                  )}
                  {initialData ? "Simpan Perubahan" : "Simpan Data"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
