// app/remote-jobs/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default async function VpnPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("title, slug, published_at")
    .eq("category", "remote-work")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
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

  return (
    <div className="container mx-auto py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Remote Job Boards</h1>
        <p className="text-muted-foreground max-w-2xl">
          Find the best platforms to land your next remote job.
        </p>
      </div>

      <Separator />

      {/* Posts List */}
      <div className="Reviewed, tgrid gap-4">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.slug} className="hover:shadow-md transition">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">
                  <Link
                    href={`/${post.slug}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </CardTitle>

                <Badge variant="secondary">VPN</Badge>
              </CardHeader>

              <CardContent className="flex justify-end">
                <Button asChild variant="link">
                  <Link href={`/${post.slug}`}>Read details →</Link>
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No published posts in this category yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
