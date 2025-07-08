import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";
type RouteProps = {
  params: Promise<{ slug: string }>;
};

const getPage = async (params: RouteProps["params"]) =>
  sanityFetch({
    query: HOME_PAGE_QUERY,
    params: await params,
  });
export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { data: page } = await getPage(params);

  if (!page) {
    return {}
  }

  const metadata: Metadata = {
    title: page.homePage?.seo?.title || page.homePage?.title || "Home",
    description: page.homePage?.seo?.description,
  };

  metadata.openGraph = {
    images: [
      {
        url: page.homePage?.seo?.image
          ? urlFor(page.homePage.seo.image).width(1200).height(630).url()
          : (page.homePage?._id ? `/api/og?id=${page.homePage._id}` : ""),
        width: 1200,
        height: 630,
      },
    ],
  };

  if (page.homePage?.seo?.noIndex) {
    metadata.robots = "noindex, nofollow";
  } else {
    metadata.robots = "index, follow";
  }

  return metadata;
}
export default async function Page({ params }: RouteProps) {

  const { data: page } = await getPage(params);

  return page?.homePage?.content ? (
    <PageBuilder documentId={page?.homePage._id}
      documentType={page?.homePage._type} content={page?.homePage.content} />

  ) : null;
}


