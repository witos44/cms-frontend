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
  'deals': [
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
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  /* ================= FETCH POST ================= */
  useEffect(() => {
    if (!id || initialDataLoaded) return;

    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('title, slug, content, category, section, cover_image')
          .eq('id', id)
          .single();

        if (error || !data) {
          toast.error('Failed to load post');
          setLoading(false);
          setInitialDataLoaded(true);
          return;
        }

        console.log('Fetched data:', data); // Debug log

        // PERBAIKAN DI SINI: Handle null/undefined values
        setTitle(data.title || '');
        setSlug(data.slug || '');
        setContent(data.content || '');
        setCategory(data.category || '');
        setSection(data.section || ''); // Pastikan section di-set, bahkan jika null
        setCoverImage(data.cover_image || null);
        setInitialDataLoaded(true);
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Error loading post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, supabase, initialDataLoaded]);

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!category) {
      toast.error('Category is required');
      return;
    }

    if (!section) {
      toast.error('Section is required');
      return;
    }

    setSaving(true);

    try {
      const images = extractImagesFromHTML(content);

      const { error } = await supabase
        .from('posts')
        .update({
          title: title.trim(),
          slug: slug.trim(),
          content: content.trim(),
          category: category.trim(),
          section: section.trim(), // Pastikan section di-update
          cover_image: coverImage,
          images,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        console.error('Save error:', error);
        toast.error(`Save failed: ${error.message}`);
        return;
      }

      toast.success('Draft saved successfully');
      router.push('/dashboard/posts');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  /* ================= PUBLISH ================= */
  const handlePublish = async () => {
    if (!category || !category.trim()) {
      toast.error('Category is required');
      return;
    }

    if (!section || !section.trim()) {
      toast.error('Section is required');
      return;
    }

    setPublishing(true);

    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id, 
          category: category.trim(), 
          section: section.trim() // Pastikan section dikirim
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Publish API error:', data);
        toast.error(`Publish failed: ${data.error || 'Unknown error'}`);
        return;
      }

      toast.success('Post published successfully');
      router.push('/dashboard/posts');
    } catch (error) {
      console.error('Publish error:', error);
      toast.error('Failed to publish post');
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Post</h1>
        <div className="text-sm text-gray-500">
          ID: {id} | Category: {category || 'Not set'} | Section: {section || 'Not set'}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <Input 
            value={slug} 
            onChange={e => setSlug(e.target.value)}
            placeholder="post-url-slug"
          />
        </div>

        {/* CATEGORY SELECT */}
        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <Select
            value={category}
            onValueChange={(val) => {
              setCategory(val);
              // Reset section ketika category berubah
              setSection('');
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reviews">Reviews</SelectItem>
              <SelectItem value="guides">Guides</SelectItem>
              <SelectItem value="tools">Tools</SelectItem>
              <SelectItem value="deals">Deals</SelectItem>
            </SelectContent>
          </Select>
          {!category && (
            <p className="text-sm text-red-500 mt-1">Please select a category</p>
          )}
        </div>

        {/* SECTION SELECT */}
        {category && (
          <div>
            <label className="block text-sm font-medium mb-2">Section *</label>
            <Select 
              value={section} 
              onValueChange={setSection}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select a section in ${category}`} />
              </SelectTrigger>
              <SelectContent>
                {SECTION_MAP[category]?.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!section && (
              <p className="text-sm text-red-500 mt-1">Please select a section</p>
            )}
          </div>
        )}

        {/* EDITOR */}
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <PostEditor content={content} onChange={setContent} />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 pt-4 border-t">
        <Button 
          onClick={() => router.push('/dashboard/posts')}
          variant="outline"
        >
          Cancel
        </Button>
        
        <Button 
          onClick={handleSave} 
          disabled={saving || !category || !section}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {saving ? 'Saving...' : 'Save Draft'}
        </Button>
        
        <Button 
          onClick={handlePublish} 
          disabled={publishing || !category || !section}
          className="bg-green-600 hover:bg-green-700"
        >
          {publishing ? 'Publishing...' : 'Publish'}
        </Button>
      </div>

      {/* DEBUG INFO */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm">
        <h3 className="font-medium mb-2">Debug Info:</h3>
        <p>Category: <span className="font-mono">{category || '(empty)'}</span></p>
        <p>Section: <span className="font-mono">{section || '(empty)'}</span></p>
        <p>Will be saved to database: category="{category}", section="{section}"</p>
      </div>
    </div>
  );
}