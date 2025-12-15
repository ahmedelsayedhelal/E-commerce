import Link from "next/link";
import type { Category as categories } from "@/data/categories";
type Props = {
  locale: string;
};

async function getCategories(): Promise<categories[]> {
  const res = await fetch("http://localhost:3000/api/categories", {
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function FeaturedCategories({ locale }: Props) {
  const categories = await getCategories();

  return (
    <section className="py-16">
      <h2 className="mb-8 text-2xl font-semibold text-center">
        Featured Categories
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${locale}/category/${cat.slug}`}
            className="rounded-lg border p-6 text-center hover:bg-muted transition"
          >
            <span className="text-lg font-medium">
              {locale === "ar" ? cat.name_ar : cat.name_en}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
