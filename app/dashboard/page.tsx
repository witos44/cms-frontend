// app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server';
import { MetricCard } from './components/cards/MetricCard';
import { VisitorChart } from './components/charts/VisitorChart';

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Total Published Posts
  const { count: publishedCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');

  // 2. Posts Published This Month
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ).toISOString();

  const { count: monthlyCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')
    .gte('published_at', startOfMonth);

  // 3. Total Drafts
  const { count: draftCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft');

  // 4. Total Unique Categories
  const { data: allPosts } = await supabase
    .from('posts')
    .select('category')
    .not('category', 'is', null);

  const totalCategories = allPosts
    ? new Set(allPosts.map((p) => p.category)).size
    : 0;

  // ✅ 5. Total Unique Page Views (from unique_visits)
  const { count: totalViews } = await supabase
    .from('unique_visits')
    .select('*', { count: 'exact', head: true });

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard
          title="Published Posts"
          value={(publishedCount ?? 0).toLocaleString()}
          trend={0}
          description="Total live content"
        />
        <MetricCard
          title="Published This Month"
          value={(monthlyCount ?? 0).toLocaleString()}
          trend={0}
          description="New content"
        />
        <MetricCard
          title="Drafts"
          value={(draftCount ?? 0).toLocaleString()}
          trend={0}
          description="Unpublished posts"
        />
        <MetricCard
          title="Total Page Views"
          value={(totalViews ?? 0).toLocaleString()}
          trend={0}
          description="Unique visits recorded"
        />
      </div>

      <VisitorChart />
    </>
  );
}