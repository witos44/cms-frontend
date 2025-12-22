// components/StaticPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function StaticPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Card className="border-0 shadow-none">
        <CardHeader className="px-0 pb-2">
          <CardTitle className="text-3xl font-bold">{title}</CardTitle>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: {lastUpdated}
            </p>
          )}
        </CardHeader>
        <CardContent className="px-0 prose prose-gray prose-headings:font-sans max-w-none">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}