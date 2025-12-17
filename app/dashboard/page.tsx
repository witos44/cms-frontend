import { MetricCard } from './components/cards/MetricCard';
import { VisitorChart } from './components/charts/VisitorChart';

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard title="Total Posts" value="150" trend={5.2} description="Published this month" />
        <MetricCard title="New Visitors" value="12,345" trend={-3.1} description="Last 30 days" />
        <MetricCard title="Active Comments" value="890" trend={12.5} description="Engagement rate high" />
        <MetricCard title="Avg. Read Time" value="4.5 min" trend={0.8} description="Steady increase" />
      </div>

      <VisitorChart />
    </>
  );
}
