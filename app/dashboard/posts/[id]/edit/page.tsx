'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

import { createAuthClient } from '@/lib/supabase/auth-client';
import { PostEditor } from '@/components/PostEditor';

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createAuthClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('title, slug, content, category')
        .eq('id', id)
        .single();

      if (error || !data) {
        toast.error('Failed to load post');
        return;
      }

      setTitle(data.title ?? '');
      setSlug(data.slug ?? '');
      setContent(data.content ?? '');
      setCategory(data.category ?? '');
      setLoading(false);
    };

    fetchPost();
  }, [id, supabase]);

  const handleSave = async () => {
    setSaving(true);

    const { error } = await supabase
      .from('posts')
      .update({
        title,
        slug,
        content,
        category, // ✅ FIX: category ikut update
      })
      .eq('id', id);

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Draft saved');
    router.push('/dashboard/posts');
  };

  const handlePublish = async () => {
    if (!category) {
      toast.error('Please select a category');
      return;
    }

    setPublishing(true);

    const res = await fetch('/api/admin/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,       // ✅ FIX: pakai `id`, BUKAN postId
        category, // ✅ dikirim ke API
      }),
    });

    setPublishing(false);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      toast.error(err.error || 'Publish failed');
      return;
    }

    toast.success('Post published');
    router.push('/dashboard/posts');
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Post</h1>

      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input value={slug} onChange={(e) => setSlug(e.target.value)} />

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="security-tools">Security Tools</SelectItem>
          <SelectItem value="remote-work">Remote Work</SelectItem>
          <SelectItem value="deals">Deals</SelectItem>
          <SelectItem value="guides">Guides</SelectItem>
          <SelectItem value="reviews">Reviews</SelectItem>
        </SelectContent>
      </Select>

      <PostEditor content={content} onChange={setContent} />

      <div className="flex gap-2">
        <Button onClick={handleSave} disabled={saving}>
          Save Draft
        </Button>

        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={handlePublish}
          disabled={publishing}
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
