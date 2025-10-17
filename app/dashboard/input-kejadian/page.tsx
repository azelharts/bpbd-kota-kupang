"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Save, UploadCloud } from "lucide-react";
import { useState } from "react";
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
  jenisList,
  kecList,
  kelList,
  namaList,
  numericDefaults,
} from "@/constants/kejadian";
import { formSchema, FormValues } from "@/lib/schemas/kejadian-schema";
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

export default function InputKejadianPage() {
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      status_darurat: "",
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

  async function onSubmit(values: FormValues) {
    try {
      const body = new FormData();

      Object.entries(values).forEach(([k, v]) => {
        if (k === "foto") {
          if (file) body.append("foto", file);
        } else if (Array.isArray(v)) {
          body.append(k, JSON.stringify(v));
        } else if (v instanceof Date) {
          body.append(k, format(v, "yyyy-MM-dd"));
        } else {
          body.append(k, String(v || ""));
        }
      });

      const response = await fetch("/api/kejadian", {
        method: "POST",
        body,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menyimpan data");
      }

      toast.success("Data kejadian berhasil disimpan!");
      form.reset();
      setFile(null);

      // Optional: redirect to list page
      // router.push("/dashboard/kejadian");
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-foreground font-medium">Input Data Kejadian</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="bg-destructive text-white p-2 rounded-lg">
              <Save className="w-6 h-6" />
            </div>
            <span>Input Data Kejadian Bencana</span>
          </CardTitle>
          <CardDescription>
            Formulir pelaporan kejadian bencana alam
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* ---------- B.1 ---------- */}
              <Card>
                <CardHeader>
                  <CardTitle>B.1 Data Kejadian Bencana</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
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
                            defaultValue={field.value}
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
                            defaultValue={field.value}
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
                              selected={field.value}
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
                            defaultValue={field.value}
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
                            defaultValue={field.value}
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
                    name="status_darurat"
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
                                onChange={(e) =>
                                  setFile(e.target.files?.[0] ?? null)
                                }
                              />
                            </Label>
                            {file && <Badge>{file.name}</Badge>}
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
                            <Input {...field} />
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
                <CardContent className="overflow-x-auto">
                  <ManusiaTable form={form} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    B.4 Data Kerusakan dan Kerugian Sosial Ekonomi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                <CardContent className="space-y-6">
                  <PrasaranaTable form={form} />
                  <JembatanTable form={form} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>B.6 Data Kerusakan dan Kerugian Rumah</CardTitle>
                </CardHeader>
                <CardContent>
                  <RumahTable form={form} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    B.7 Data Kerusakan dan Kerugian Pelayanan Dasar
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
              <div className="flex gap-4">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <span className="mr-2 w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
                  )}
                  Simpan Data
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setFile(null);
                  }}
                >
                  Reset Form
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
