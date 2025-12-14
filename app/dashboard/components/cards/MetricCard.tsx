// app/dashboard/components/cards/MetricCard.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  trend: number; // Persentase tren
  description: string;
}

export function MetricCard({ title, value, trend, description }: MetricCardProps) {
  const isPositive = trend >= 0;
  const trendColor = isPositive ? 'text-green-500' : 'text-red-500';
  const trendIcon = isPositive ? <ArrowUp className="inline ml-1 h-4 w-4" /> : <ArrowDown className="inline ml-1 h-4 w-4" />;

  return (
    <Card className="bg-card hover:bg-accent transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center">
          <span className={`text-xs ${trendColor} flex items-center`}>
            {isPositive ? '+' : ''}{trend}% {trendIcon}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}