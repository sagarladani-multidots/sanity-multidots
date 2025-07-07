import React, { useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import '@/app/css/ImageText.css';

type ButtonProps = {
    text: string;
    link: string;
    openInNewTab?: boolean;
};

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

type ImageTextSectionProps = {
    title?: string;
    subTitle?: string;
    description?: import('@portabletext/types').PortableTextBlock[];
    mainImage?: {
        asset?: {
            _ref?: string;
            _type?: string;
        };
        alt?: string;
        width?: number;
        height?: number;
        [key: string]: unknown;
    };
    imagePosition?: 'left' | 'right';
    button?: ButtonProps; // Changed from buttons[] to single button
};

export default function ImageTextSection({
    title,
    subTitle,
    description,
    mainImage,
    imagePosition = 'right',
    button // Now accepts single button
}: ImageTextSectionProps) {

    useEffect(() => {
        if (!document.querySelector(`script[src="${CALENDLY_SCRIPT_SRC}"]`)) {
            const script = document.createElement('script');
            script.src = CALENDLY_SCRIPT_SRC;
            script.async = true;
            document.head.appendChild(script); // Important: Calendly recommends placing it in <head>
        }
        const calendlyCSSHref = 'https://assets.calendly.com/assets/external/widget.css';
        if (!document.querySelector(`link[href="${calendlyCSSHref}"]`)) {
            const link = document.createElement('link');
            link.href = calendlyCSSHref;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }, []);

    const handleCalendlyClick = () => {
        if (button?.link && (window as any).Calendly) {
            (window as any).Calendly.initPopupWidget({ url: button.link });
        } else {
            console.warn('Calendly script not yet loaded or invalid link');
        }
    };

    return (
        <section className={`image-text-section-main image-text-section--${imagePosition}`}>
            <div className='image-text-section-inner'>
                {title && <h2 className="image-text-section-title">{title}</h2>}
                {subTitle && <p className="image-text-section-subtitle">{subTitle}</p>}
                <div className="image-text-section-details">
                    <div className="image-text-section-content">
                        {description && (
                            <div className="image-text-section-description">
                                <PortableText value={description} />
                            </div>
                        )}
                        {button && (
                            <div className="image-text-section-button">
                                <button
                                    onClick={handleCalendlyClick}
                                    className="image-text-section-button-text"
                                    rel={button.openInNewTab ? 'noopener noreferrer' : undefined}
                                >
                                    {button.text}
                                </button>
                            </div>
                        )}
                    </div>

                    {mainImage && mainImage.asset && (
                        <div className="image-text-section-image">
                            <Image
                                src={urlFor(mainImage).url()}
                                alt={mainImage.alt || ''}
                                width={typeof mainImage.width === 'number' ? mainImage.width : 620}
                                height={typeof mainImage.height === 'number' ? mainImage.height : 310}
                                className="image-text-section-image-img"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
