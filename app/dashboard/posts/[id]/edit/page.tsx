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

/* ===== HELPER ===== */
function extractImagesFromHTML(html: string): string[] {
  if (!html) return [];
  const matches = [...html.matchAll(/<img[^>]+src="([^">]+)"/g)];
  return matches.map(m => m[1]);
}

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
  const [coverImage, setCoverImage] = useState<string | null>(null);

  /* ================= FETCH POST ================= */
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('title, slug, content, category, cover_image')
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
      setCoverImage(data.cover_image ?? null);
      setLoading(false);
    };

    fetchPost();
  }, [id, supabase]);

  /* ================= COVER UPLOAD ================= */
  const handleCoverUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('postId', id);

    const res = await fetch('/api/admin/upload-cover', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      toast.error('Upload cover image failed');
      return;
    }

    const data = await res.json();
    setCoverImage(data.url);
  };

  /* ================= SAVE DRAFT (FIXED) ================= */
  const handleSave = async () => {
    setSaving(true);

    const images = extractImagesFromHTML(content);

    const { error } = await supabase
      .from('posts')
      .update({
        title,
        slug,
        content,
        category,
        cover_image: coverImage,
        images, // ✅ FIX
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

  /* ================= PUBLISH ================= */
  const handlePublish = async () => {
    if (!category) {
      toast.error('Please select a category');
      return;
    }

    setPublishing(true);

    const res = await fetch('/api/admin/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, category }),
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

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <h1 className="text-2xl font-bold">Edit Post</h1>

      <Input
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

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

      {/* ===== COVER IMAGE ===== */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Cover Image</label>

        {coverImage && (
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-64 object-cover rounded-md border"
          />
        )}

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleCoverUpload(file);
          }}
        />
      </div>

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
