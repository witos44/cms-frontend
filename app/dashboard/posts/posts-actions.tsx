'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

export default function PostsActions({ post }: any) {
  const [loading, setLoading] = useState(false);

  const publishPost = async () => {
    setLoading(true);

    const res = await fetch('/api/admin/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: post.id }),
    });

    setLoading(false);

    if (!res.ok) {
      toast.error('Failed to publish post');
      return;
    }

    toast.success('Post published');
    location.reload();
  };

  const deletePost = async () => {
    setLoading(true);

    const res = await fetch(`/api/admin/posts/${post.id}`, {
      method: 'DELETE',
    });

    setLoading(false);

    if (!res.ok) {
      toast.error('Failed to delete post');
      return;
    }

    toast.success('Post deleted');
    location.reload();
  };

  return (
    <div className="space-x-2">
      {post.status === 'draft' && (
        <Button size="sm" disabled={loading} onClick={publishPost}>
          Publish
        </Button>
      )}

      <Button size="sm" variant="outline" asChild>
        <Link href={`/dashboard/posts/${post.id}/edit`}>
          Edit
        </Link>
      </Button>

      <Button
        size="sm"
        variant="destructive"
        disabled={loading}
        onClick={deletePost}
      >
        Delete
      </Button>
    </div>
  );
}
