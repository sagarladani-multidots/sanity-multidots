import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { HEADER_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';

export default async function Header() {
    const { data: siteSettings } = await sanityFetch({ query: HEADER_QUERY });

    const { logo, sanityLogo, siteTitle } = siteSettings || {};


    return (
        <header className="site-header">
            <div className="header-inner">
                <div className="header-logo">
                    {logo && (
                        <Link href="/">
                            <Image
                                src={urlFor(logo).url()}
                                alt={logo.alt || siteTitle || 'Logo'}
                                width={logo.width || 150}
                                height={logo.height || 40}
                                priority
                            />
                        </Link>
                    )}
                </div>

                {sanityLogo && (
                    <div className="header-sanity-logo">
                        <Link href={sanityLogo.url || '#'}>
                            <Image
                                src={urlFor(sanityLogo).url()}
                                alt={sanityLogo.alt || 'Sanity Logo'}
                                width={sanityLogo.width || 100}
                                height={sanityLogo.height || 30}
                            />
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}