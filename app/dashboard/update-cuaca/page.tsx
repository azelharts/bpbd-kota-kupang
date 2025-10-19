"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Cloud, UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { toast } from "sonner";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CuacaFormValues, cuacaSchema } from "@/lib/schemas/cuaca-schema";
import { useRouter } from "next/navigation";

export default function UpdateCuacaPage({
  initialData,
}: { initialData?: any } = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [existingDataId, setExistingDataId] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<CuacaFormValues>({
    resolver: zodResolver(cuacaSchema),
    defaultValues: {
      namaPrakiraan: "",
    },
  });

  // Load existing cuaca data on mount
  useEffect(() => {
    const loadCuacaData = async () => {
      try {
        const response = await fetch("/api/cuaca");
        if (response.ok) {
          const data = await response.json();
          if (data && data.namaPrakiraan) {
            setExistingDataId(data.id);
            form.reset({
              namaPrakiraan: data.namaPrakiraan,
            });
            if (data.fotoUrl) {
              setPreviewUrl(data.fotoUrl);
            }
          }
        }
      } catch (error) {
        console.error("Error loading cuaca data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCuacaData();
  }, [form]);

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

  async function onSubmit(values: CuacaFormValues) {
    try {
      const body = new FormData();
      body.append("namaPrakiraan", values.namaPrakiraan);

      if (file) {
        body.append("foto", file);
      }

      // Use PUT if data exists, POST if creating new
      const method = existingDataId ? "PUT" : "POST";

      const response = await fetch("/api/cuaca", {
        method,
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menyimpan data cuaca");
      }

      const result = await response.json();

      toast.success(
        existingDataId
          ? "Data cuaca berhasil diperbarui!"
          : "Data cuaca berhasil dibuat!"
      );

      // Set the existing data ID for future updates
      if (result.data?.id) {
        setExistingDataId(result.data.id);
      }

      // Reset file state but keep form data
      setFile(null);

      // Update preview with new image URL if provided
      if (result.data?.fotoUrl) {
        setPreviewUrl(result.data.fotoUrl);
      }

      // Reload the page to show updated data
      router.refresh();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-disaster-orange"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage className="text-disaster-orange font-medium">
            {existingDataId ? "Update" : "Buat"} Data Cuaca
          </BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="!border-none !shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="bg-disaster-orange text-white p-2 rounded-lg">
              <Cloud className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-2xl font-bold text-gray-900">
                {existingDataId ? "Update" : "Buat"} Data Cuaca
              </span>
              <span className="text-gray-600 font-normal">
                Formulir {existingDataId ? "pembaruan" : "pembuatan"} data
                prakiraan cuaca
              </span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Prakiraan Cuaca</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="namaPrakiraan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nama Prakiraan <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan nama prakiraan"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="foto"
                    render={() => (
                      <FormItem>
                        <FormLabel>Foto Prakiraan</FormLabel>
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
                              <div className="relative w-full max-w-md">
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="w-full h-auto rounded-lg border shadow-sm"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2"
                                  onClick={clearImage}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
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
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-end flex-wrap gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setFile(null);
                    // Don't clear previewUrl on reset - keep existing image visible
                  }}
                >
                  Reset Form
                </Button>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-disaster-orange hover:bg-disaster-orange-dark"
                >
                  {form.formState.isSubmitting && (
                    <span className="mr-2 w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
                  )}
                  {existingDataId ? "Perbarui" : "Simpan"} Data
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
