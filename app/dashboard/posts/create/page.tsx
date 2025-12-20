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
      alert('Gagal membuat post');
    }
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Buat Posting Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium">Judul</label>
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
            <option value="guides">Guides</option>
            <option value="deals">Deals</option>
            <option value="remote-jobs">Remote Jobs</option>
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
            {category === 'guides' && (
              <>
                <option value="security-basics">Security Basics</option>
                <option value="privacy-essentials">Privacy Essentials</option>
                <option value="secure-workspace">Secure Workspace</option>
                <option value="digital-footprint">Digital Footprint</option>
                <option value="remote-starter-kit">Remote Starter Kit</option>
                <option value="productivity">Productivity</option>
                <option value="remote-interview">Remote Interview</option>
                <option value="digital-nomad">Digital Nomad</option>
              </>
            )}

            {category === 'deals' && (
              <>
                <option value="vpn-deals">VPN Deals</option>
                <option value="software-deals">Software Deals</option>
                <option value="gear-deals">Gear Deals</option>
              </>
            )}

            {category === 'remote-jobs' && (
              <>
                <option value="job-board">Job Board</option>
                <option value="tech-jobs">Tech Jobs</option>
                <option value="entry-level">Entry Level</option>
                <option value="freelance">Freelance</option>
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
