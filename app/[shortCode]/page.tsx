import LoadingRedirect from "@/components/LoadingRedirect";
import { notFound } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/url/getUrl?shortCode=${shortCode}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    notFound();
  }

  const { data } = await response.json();

  if (!data?.longUrl) {
    notFound();
  }

  return <LoadingRedirect targetUrl={data.longUrl} />;
}
