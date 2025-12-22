// app/[category]/page.tsx
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const supabase = await createClient();

  const validCategories = ["reviews", "guides", "tools", "deals"];
  if (!validCategories.includes(category)) {
    notFound();
  }

  // 🔥 AMBIL SUB CATEGORY, BUKAN POST
  const { data: subCategories } = await supabase
    .from("sub_categories")
    .select("name, slug")
    .eq("category", category)
    .order("name");

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {category.replace("-", " ")}
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        {subCategories?.map((sub) => (
          <Link
            key={sub.slug}
            href={`/${category}/${sub.slug}`}
            className="block border rounded-lg p-4 hover:bg-muted transition"
          >
            <h2 className="font-semibold">{sub.name}</h2>
            <p className="text-sm text-muted-foreground">
              View articles →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
