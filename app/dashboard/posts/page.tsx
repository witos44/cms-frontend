import Link from "next/link";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

/* ================= SERVER ACTIONS ================= */

async function publishPost(id: string) {
  "use server";

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("posts")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/posts");
}

async function deletePost(id: string) {
  "use server";

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/posts");
}

/* ================= PAGE ================= */

export default async function PostsPage() {
  const supabase = createAdminClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("id,title,slug,status,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Posts</h1>

        <Button asChild>
          <Link href="/dashboard/posts/create">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Created</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {posts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No posts found.
                </TableCell>
              </TableRow>
            )}

            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">
                  {post.title}
                </TableCell>

                <TableCell>{post.slug}</TableCell>

                <TableCell className="text-center">
                  <Badge
                    variant={
                      post.status === "published"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {post.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-center">
                  {new Date(post.created_at).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-center space-x-2">
                  {post.status === "draft" && (
                    <form action={publishPost.bind(null, post.id)} className="inline">
                      <Button size="sm">Publish</Button>
                    </form>
                  )}

                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/dashboard/posts/${post.id}/edit`}>
                      Edit
                    </Link>
                  </Button>

                  <form action={deletePost.bind(null, post.id)} className="inline">
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
