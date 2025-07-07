import React, { useEffect } from 'react';
import '@/app/css/CTA.css';

type ButtonProps = {
    text: string;
    link: string; // Calendly link
    openInNewTab?: boolean;
};

type CtaBlockProps = {
    heading?: string;
    subheading?: string;
    button?: ButtonProps;
    backgroundColor?: string | { hex: string };
    textColor?: string | { hex: string };
};

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

export default function CTABlock({
    heading,
    subheading,
    button,
    backgroundColor,
    textColor,
}: CtaBlockProps) {
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
        <section
            className="cta-block-main"
            style={{
                backgroundColor:
                    typeof backgroundColor === 'string'
                        ? backgroundColor
                        : backgroundColor?.hex || 'transparent',
                color: typeof textColor === 'string' ? textColor : textColor?.hex,
            }}
        >
            <div className="cta-block-content">
                {heading && <h2 className="cta-block-heading">{heading}</h2>}
                {subheading && <p className="cta-block-description">{subheading}</p>}
            </div>

            {button && (
                <div className="cta-block-buttons">
                    <button
                        onClick={handleCalendlyClick}
                        className="cta-block-buttons-text"
                        rel={button.openInNewTab ? 'noopener noreferrer' : undefined}
                    >
                        {button.text}
                    </button>
                </div>
            )}
        </section>
    );
}