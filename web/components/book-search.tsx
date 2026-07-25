"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

import { Input } from "@/components/ui/input";

const DEBOUNCE_MS = 300;

export function BookSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }, DEBOUNCE_MS);
  }

  return (
    <div className="relative max-w-sm">
      <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar por título ou autor"
        defaultValue={searchParams.get("q")?.toString()}
        onChange={handleChange}
        className="pl-8"
      />
    </div>
  );
}
