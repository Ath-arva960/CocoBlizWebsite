import { useEffect } from 'react';

type StructuredDataValue = Record<string, unknown> | Array<Record<string, unknown>>;

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: string;
  siteName?: string;
  noIndex?: boolean;
  structuredData?: StructuredDataValue | StructuredDataValue[];
}

const defaultSiteUrl = 'https://cocoblitz.com';

function resolveUrl(value: string | undefined, fallback: string): string {
  if (!value) return fallback;

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return new URL(value, `${fallback}/`).toString();
}

function setMetaTag(selector: string, attributes: Record<string, string>) {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement('meta');
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag?.setAttribute(key, value);
  });
}

function setLinkTag(selector: string, attributes: Record<string, string>) {
  let tag = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!tag) {
    tag = document.createElement('link');
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag?.setAttribute(key, value);
  });
}

export function Seo({
  title,
  description,
  canonical,
  image,
  type = 'website',
  siteName = 'Cocoblitz',
  noIndex = false,
  structuredData,
}: SeoProps) {
  const siteUrl =
    (import.meta.env.VITE_SITE_URL || defaultSiteUrl).replace(/\/$/, '');
  const resolvedCanonical = resolveUrl(canonical, siteUrl);
  const resolvedImage = resolveUrl(image, siteUrl);

  useEffect(() => {
    document.title = title;

    setMetaTag('meta[name="description"]', {
      name: 'description',
      content: description,
    });

    setMetaTag('meta[name="robots"]', {
      name: 'robots',
      content: noIndex ? 'noindex, nofollow' : 'index, follow',
    });

    setMetaTag('meta[property="og:title"]', {
      property: 'og:title',
      content: title,
    });

    setMetaTag('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });

    setMetaTag('meta[property="og:type"]', {
      property: 'og:type',
      content: type,
    });

    setMetaTag('meta[property="og:url"]', {
      property: 'og:url',
      content: resolvedCanonical,
    });

    setMetaTag('meta[property="og:image"]', {
      property: 'og:image',
      content: resolvedImage,
    });

    setMetaTag('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: siteName,
    });

    setMetaTag('meta[property="og:image:alt"]', {
      property: 'og:image:alt',
      content: title,
    });

    setMetaTag('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    setMetaTag('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: title,
    });

    setMetaTag('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });

    setMetaTag('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: resolvedImage,
    });

    setMetaTag('meta[name="twitter:image:alt"]', {
      name: 'twitter:image:alt',
      content: title,
    });

    setLinkTag('link[rel="canonical"]', {
      rel: 'canonical',
      href: resolvedCanonical,
    });
  }, [description, noIndex, resolvedCanonical, resolvedImage, siteName, title, type]);

  if (!structuredData) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
