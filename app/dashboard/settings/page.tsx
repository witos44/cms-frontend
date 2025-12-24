// app/dashboard/settings/page.tsx
import { createAdminClient } from "@/lib/supabase/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function SettingsPage() {
  const supabase = createAdminClient();

  const { data: settings, error } = await supabase
    .from("settings")
    .select("key, value, updated_at")
    .order("key");

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="text-center">Updated</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {settings.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                  No settings found.
                </TableCell>
              </TableRow>
            )}

            {settings.map((item) => (
              <TableRow key={item.key}>
                <TableCell className="font-medium">
                  <Badge variant="outline">{item.key}</Badge>
                </TableCell>

                <TableCell className="font-mono text-sm">
                  {JSON.stringify(item.value)}
                </TableCell>

                <TableCell className="text-center">
                  {item.updated_at
                    ? new Date(item.updated_at).toLocaleDateString()
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
