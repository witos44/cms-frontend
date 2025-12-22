// app/dashboard/posts/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostEditor } from '@/components/PostEditor';

export default function CreatePostPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('guides');
  const [section, setSection] = useState('security-basics');
  const [content, setContent] = useState('<p>Ketik konten di sini...</p>');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug,
        content,
        category,
        section,
      }),
    });

    if (res.ok) {
      router.push('/dashboard/posts');
    } else {
      alert('Failed to create post');
    }
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium">Menu (Category)</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="guides">Reviews</option>
            <option value="guides">Guides</option>
            <option value="deals">Tools</option>
            <option value="remote-jobs">Deals</option>
          </select>
        </div>

        {/* SECTION */}
        <div>
          <label className="block text-sm font-medium">Sub Menu (Section)</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {category === 'reviews' && (
              <>
                <option value="best-vpns">Best VPNs</option>
                <option value="password-managers">Password Managers</option>
                <option value="antivirus">Antivirus</option>
                <option value="encrypted-email">Encrypted Email</option>
                <option value="yubikey-2fa-keys">YubiKey & 2FA Keys</option>
                <option value="privacy-browsers">Privacy Browsers</option>
                <option value="secure-note-apps">Secure Note Apps</option>
                <option value="self-hosted-alternatives">Self-Hosted Alternatives</option>
              </>
            )}

            {category === 'guides' && (
              <>
                <option value="privacy-checklist">Privacy Checklist</option>
                <option value="leave-google-guide">Leave Google Guide</option>
                <option value="secure-browsing">Secure Browsing</option>
                <option value="reduce-digital-footprint">Reduce Digital Footprint</option>
                <option value="security-basics">Security Basics</option>
                <option value="2fa-setup-guide">2FA Setup Guide</option>
                <option value="encrypted-backups">Encrypted Backups</option>
                <option value="home-network-security">Home Network Security</option>
              </>
            )}

            {category === 'tools' && (
              <>
                <option value="vpns">VPNs</option>
                <option value="password-managers">Password Managers</option>
                <option value="encryption-tools">Encryption Tools</option>
                <option value="open-source-only">Open Source Only</option>
                <option value="self-hosted-tools">Self-Hosted Tools</option>
              </>
            )}

            {category === 'deals' && (
              <>
                <option value="nordvpn-deals">NordVPN Deals</option>
                <option value="1password-deals">1Password Deals</option>
                <option value="proton-unlimited-deals">Proton Unlimited Deals</option>
                <option value="vpn-deals">VPN Deals</option>
                <option value="software-deals">Software Deals</option>
                <option value="hardware-deals">Hardware Deals</option>
              </>
            )}
          </select>
        </div>

        {/* CONTENT */}
        <div>
          <label className="block text-sm font-medium mb-1">Konten</label>
          <PostEditor content={content} onChange={setContent} />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Simpan Post
        </button>
      </form>
    </div>
  );
}
