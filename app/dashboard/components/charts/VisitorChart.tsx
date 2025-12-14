'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useResizeDetector } from 'react-resize-detector';

const data = [
  { name: 'Nov 1', visitors: 1200 },
  { name: 'Nov 7', visitors: 1500 },
  { name: 'Nov 14', visitors: 1800 },
  { name: 'Nov 21', visitors: 1600 },
  { name: 'Nov 28', visitors: 2000 },
];

export function VisitorChart() {
  const { width, height, ref } = useResizeDetector();

  if (!width || !height) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Monthly Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Loading chart...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Monthly Visitors</CardTitle>
        <div className="flex space-x-1">
          <Button variant="outline" size="sm">Last 3 months</Button>
          <Button variant="outline" size="sm">Last 30 days</Button>
          <Button variant="outline" size="sm">Last 7 days</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div ref={ref} className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
