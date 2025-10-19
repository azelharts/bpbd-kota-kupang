import { z } from "zod";

export const cuacaSchema = z.object({
  namaPrakiraan: z.string().min(1, "Nama prakiraan wajib diisi"),
  foto: z.instanceof(File).optional(),
});

export type CuacaFormValues = z.infer<typeof cuacaSchema>;
