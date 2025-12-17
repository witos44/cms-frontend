// app/dashboard/posts/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostEditor } from '@/components/PostEditor';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('<p>Ketik konten di sini...</p>');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content }),
    });

    if (res.ok) {
      router.push('/dashboard/posts');
    } else {
      alert('Gagal membuat post');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buat Posting Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Konten</label>
          <PostEditor content={content} onChange={setContent} />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Simpan Posting
        </button>
      </form>
    </div>
  );
}