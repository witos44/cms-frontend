// app/vpn/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default async function VpnPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select(`
      title,
      slug,
      published_at,
      cover_image,
      content
    `)
    .eq("category", "security-tools")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("VPN PAGE ERROR:", error);
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardContent className="p-6 text-center text-destructive">
            Failed to load content.
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No published posts yet.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Best VPN Providers
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Reviewed, tested, and compared by our security team.
        </p>
      </div>

      <Separator />

      {/* Posts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="overflow-hidden hover:shadow-md transition">
            {/* COVER IMAGE */}
            {post.cover_image && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}

            <CardHeader className="space-y-2">
              <Badge variant="secondary">VPN</Badge>

              <CardTitle className="text-lg leading-snug">
                <Link href={`/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>

            {post.content && (
              <CardContent className="pt-0">
                <div
                  className="prose prose-sm text-muted-foreground line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
            )}

            <CardContent className="pt-0 flex justify-end">
              <Button asChild variant="link">
                <Link href={`/${post.slug}`}>Read details →</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
