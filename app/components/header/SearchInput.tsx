"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const t = useTranslations("Search");
  const locale = useLocale();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/${locale}/products?search=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <form
      onSubmit={onSearch}
      role="search"
      aria-label={t("aria")}
      className="relative hidden md:block"
    >
      <input
        type="text"
        placeholder={t("placeholder")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-56
          rounded-md
          border
          bg-background
          px-3 py-2
          text-sm
          outline-none
          transition
          focus:ring-2
          focus:ring-primary
        "
      />

      <Search
        className="
          pointer-events-none
          absolute
          top-1/2
          h-4 w-4
          -translate-y-1/2
          text-muted-foreground
          ltr:right-3
          rtl:left-3
        "
      />
    </form>
  );
}
