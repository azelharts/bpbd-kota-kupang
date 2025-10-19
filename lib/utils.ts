import { clsx, type ClassValue } from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openPrintPreview(data: any) {
  const encoded = encodeURIComponent(JSON.stringify(data));
  window.open(`/dashboard/kejadian/print-preview?d=${encoded}`, "_blank");
}
