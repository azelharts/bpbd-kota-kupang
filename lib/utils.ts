import { clsx, type ClassValue } from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function useObjectURL(file: File | null) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      // nothing selected → nothing to show
      setUrl(null);
      return;
    }
    const u = URL.createObjectURL(file);
    setUrl(u); // create preview url
    return () => URL.revokeObjectURL(u); // clean-up when file changes
  }, [file]);

  return url;
}
