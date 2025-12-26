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

/* ===== CATEGORY → SECTION MAP ===== */
const SECTION_MAP: Record<string, { value: string; label: string }[]> = {
  reviews: [
    { value: 'best-vpns', label: 'Best VPNs' },
    { value: 'password-managers', label: 'Password Managers' },
    { value: 'antivirus', label: 'Antivirus' },
    { value: 'encrypted-email', label: 'Encrypted Email' },
    { value: 'yubikey-2fa-keys', label: 'YubiKey & 2FA Keys' },
    { value: 'privacy-browsers', label: 'Privacy Browsers' },
    { value: 'secure-note-apps', label: 'Secure Note Apps' },
    { value: 'self-hosted-alternatives', label: 'Self-Hosted Alternatives' },
  ],
  guides: [
    { value: 'privacy-checklist', label: 'Privacy Checklist' },
    { value: 'leave-google-guide', label: 'Leave Google Guide' },
    { value: 'secure-browsing', label: 'Secure Browsing' },
    { value: 'reduce-digital-footprint', label: 'Reduce Digital Footprint' },
    { value: 'security-basics', label: 'Security Basics' },
    { value: '2fa-setup-guide', label: '2FA Setup Guide' },
    { value: 'encrypted-backups', label: 'Encrypted Backups' },
    { value: 'home-network-security', label: 'Home Network Security' },
  ],
  tools: [
    { value: 'vpns', label: 'VPNs' },
    { value: 'password-managers', label: 'Password Managers' },
    { value: 'encryption-tools', label: 'Encryption Tools' },
    { value: 'open-source-only', label: 'Open Source Only' },
    { value: 'self-hosted-tools', label: 'Self-Hosted Tools' },
  ],
  deals: [
    { value: 'nordvpn-deals', label: 'NordVPN Deals' },
    { value: '1password-deals', label: '1Password Deals' },
    { value: 'proton-unlimited-deals', label: 'Proton Unlimited Deals' },
    { value: 'vpn-deals', label: 'VPN Deals' },
    { value: 'software-deals', label: 'Software Deals' },
    { value: 'hardware-deals', label: 'Hardware Deals' },
  ],
};

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
  const [section, setSection] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);

  /* ================= FETCH POST ================= */
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('title, slug, content, category, section, cover_image')
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
      setSection(data.section ?? '');
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

  /* ================= SAVE DRAFT ================= */
  const handleSave = async () => {
    if (!category || !section) {
      toast.error('Category and section are required');
      return;
    }

    setSaving(true);

    const images = extractImagesFromHTML(content);

    const { error } = await supabase
      .from('posts')
      .update({
        title,
        slug,
        content,
        category,
        section,
        cover_image: coverImage,
        images,
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
    if (!category || !section) {
      toast.error('Category and section are required');
      return;
    }

    setPublishing(true);

    const res = await fetch('/api/admin/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, category, section }),
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

      {/* CATEGORY */}
      <Select value={category} onValueChange={(val) => {
        setCategory(val);
        setSection('');
      }}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="reviews">Reviews</SelectItem>
          <SelectItem value="guides">Guides</SelectItem>
          <SelectItem value="tools">Tools</SelectItem>
          <SelectItem value="deals">Deals</SelectItem>
        </SelectContent>
      </Select>

      {/* SECTION */}
      {category && (
        <Select value={section} onValueChange={setSection}>
          <SelectTrigger>
            <SelectValue placeholder={`Select section in ${category}`} />
          </SelectTrigger>
          <SelectContent>
            {SECTION_MAP[category]?.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* COVER IMAGE */}
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
        <Button onClick={handleSave} disabled={saving || !category || !section}>
          Save Draft
        </Button>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={handlePublish}
          disabled={publishing || !category || !section}
        >
          Publish
        </Button>
      </div>
    </div>
  );
}