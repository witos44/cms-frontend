// app/posts/[slug]/page.tsx
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("title, content, published_at, category")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/40 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-8 space-y-6">
          {/* Category + Date */}
          <div className="flex items-center justify-between">
            {post.category && (
              <Badge variant="secondary" className="capitalize">
                {post.category.replace("-", " ")}
              </Badge>
            )}
            <span className="text-sm text-muted-foreground">
              {new Date(post.published_at).toLocaleDateString()}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          <Separator />

          {/* Content */}
          <article
            className="
              prose
              prose-neutral
              max-w-none
              prose-img:rounded-lg
              prose-img:mx-auto
              prose-img:my-6
              prose-a:text-primary
              prose-a:no-underline
              hover:prose-a:underline
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
