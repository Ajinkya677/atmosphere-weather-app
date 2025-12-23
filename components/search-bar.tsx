'use client';

import { useEffect, useState, type FormEvent } from "react";
import { LocateFixed, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  defaultValue?: string;
  onSearch: (value: string) => void;
  onUseLocation: () => void;
  loading?: boolean;
}

export function SearchBar({
  defaultValue = "",
  onSearch,
  onUseLocation,
  loading = false,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass w-full flex items-center gap-3 rounded-2xl px-4 py-3 sm:px-5 sm:py-4"
    >
      <Search className="h-5 w-5 text-white/70" aria-hidden />
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search by city or place"
        aria-label="Search for a city"
        className="flex-1 bg-transparent outline-none text-base sm:text-lg placeholder:text-white/40"
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onUseLocation}
          className="group rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 transition hover:-translate-y-[1px] hover:bg-white/10 active:translate-y-0"
        >
          <span className="flex items-center gap-2">
            <LocateFixed className="h-4 w-4 text-white/70 group-hover:text-white" />
            <span className="hidden sm:inline">Use location</span>
          </span>
        </button>
        <button
          type="submit"
          disabled={loading}
          className={cn(
            "rounded-xl bg-white text-slate-900 px-4 py-2 text-sm font-semibold shadow-lg shadow-slate-900/20 transition hover:-translate-y-[1px] active:translate-y-0",
            loading && "cursor-not-allowed opacity-80"
          )}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-label="Loading" /> : "Search"}
        </button>
      </div>
    </form>
  );
}

