export const runtime = "nodejs";

export async function GET() {
  return new Response(
    JSON.stringify({ message: "API OK" }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
