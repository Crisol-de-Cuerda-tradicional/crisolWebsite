import { useLocale } from '@hooks';
import { baseUrl } from '@utils/baseUrl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  keywords?: string[];
}

export const SEO = ({
  title = 'Crisol de Cuerda - Traditional Music Camp',
  description = 'Crisol de Cuerda is a traditional music camp for violin, cello, guitar, flute and other instruments celebrated in Spain',
  image = '/images/og-image.jpg',
  article = false,
  keywords = [
    'music camp',
    'traditional music',
    'fiddle',
    'violin',
    'cello',
    'guitar',
    'Spain',
    'summer camp',
    'folk music',
    'celtic music',
  ],
}: SEOProps) => {
  const router = useRouter();
  const locale = useLocale();

  // Server-safe values for initial render to prevent hydration mismatch
  const [ogLocale, setOgLocale] = useState('es_ES');
  const [altLinks, setAltLinks] = useState<React.ReactNode[]>([]);

  // Format page title
  const formattedTitle = `${title} | Crisol de Cuerda`;

  // Generate canonical URL
  const canonicalUrl = `https://crisoldecuerda.com${router.asPath.split('?')[0]}`;

  // Handle locale-specific elements after initial render to avoid hydration mismatch
  useEffect(() => {
    // Set OpenGraph locale
    setOgLocale(locale === 'es' ? 'es_ES' : 'en_US');

    // Set alternate language links
    const links = [];
    if (locale === 'es') {
      links.push(
        <link
          key="alt-en"
          rel="alternate"
          href={`https://crisoldecuerda.com/en${router.pathname.replace('[locale]', '')}`}
          hrefLang="en"
        />
      );
    } else if (locale === 'en') {
      links.push(
        <link
          key="alt-es"
          rel="alternate"
          href={`https://crisoldecuerda.com/es${router.pathname.replace('[locale]', '')}`}
          hrefLang="es"
        />
      );
    }
    setAltLinks(links);
  }, [locale, router.pathname]);

  return (
    <Head>
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={baseUrl(image)} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content="Crisol de Cuerda" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={baseUrl(image)} />

      {/* Alternate language versions - rendered client-side to avoid hydration mismatch */}
      {altLinks}
      <link rel="alternate" href={canonicalUrl} hrefLang="x-default" />
    </Head>
  );
};
