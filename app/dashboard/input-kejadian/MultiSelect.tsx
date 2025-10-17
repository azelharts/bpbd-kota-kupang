// components/kejadian/multi-select.tsx
"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  options: string[];
  placeholder?: string;
  onChange: (vals: string[]) => void;
  defaultValue?: string[];
}

export function MultiSelect({
  options,
  placeholder,
  onChange,
  defaultValue = [],
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(defaultValue);

  function toggleItem(item: string) {
    const next = selected.includes(item)
      ? selected.filter((i) => i !== item)
      : [...selected, item];
    setSelected(next);
    onChange(next);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex gap-1 flex-wrap">
            {selected.length
              ? selected.map((s) => (
                  <Badge key={s} variant="secondary" className="gap-1 pr-1.5">
                    {s}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItem(s);
                      }}
                    />
                  </Badge>
                ))
              : placeholder}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Cari…" />
          <CommandEmpty>Tidak ditemukan</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options.map((opt) => (
                <CommandItem key={opt} onSelect={() => toggleItem(opt)}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(opt) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
