import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { SanityLive } from "@/sanity/lib/live";
import Header from "../header";
import Footer from "../footer";
import Head from 'next/head';
import ScrollHandler from "@/components/ScrollHandler";
import "@/app/globals.css";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: homePageData } = await sanityFetch({ query: PAGE_QUERY });

  const pageTitle = homePageData?.homePage?.seo?.title || homePageData?.homePage?.title || "Default Title";
  const pageImage = homePageData?.homePage?.seo?.image ? urlFor(homePageData.homePage.seo.image).url() : undefined;
  const pageDescription = homePageData?.homePage?.seo?.description;
  const noIndex = homePageData?.homePage?.seo?.noIndex;

  console.log(noIndex);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        {pageImage && <meta property="og:image" content={pageImage} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {pageImage && <meta name="twitter:image" content={pageImage} />}

        {/* No-index if specified */}
        {noIndex && (
          <>
            <meta name="robots" content="noindex, nofollow" />
          </>
        )}
      </Head>
      <ScrollHandler />
      <body>
        <div className="container">
          <Header />
          <main className="main-content">
            {children}
            <SanityLive />
            {(await draftMode()).isEnabled && (
              <>
                <DisableDraftMode />
                <VisualEditing />
              </>
            )}
          </main>
          <Footer />
        </div>
      </body>
    </>
  );
}