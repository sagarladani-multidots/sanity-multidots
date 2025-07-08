import React from 'react';
import { PortableText } from '@portabletext/react';
import '@/app/css/Hero.css';
import type { TypedObject } from '@portabletext/types';

type HeroBlockProps = {
  text?: TypedObject | TypedObject[];
  subtitle?: string;
  backgroundColor?: string | { hex: string };
  textColor?: string | { hex: string };
  alignment?: 'left' | 'center' | 'right';
  bgImage?: {
    asset?: {
      _ref?: string;
      _type?: string;
    };
    alt?: string;
    [key: string]: unknown;
  };
};

export default function HeroBlock({
  text,
  subtitle,
  backgroundColor,
  textColor,
  alignment = 'center',
  
}: HeroBlockProps) {
  const bgColor = typeof backgroundColor === 'string'
    ? backgroundColor
    : backgroundColor?.hex;

  const txtColor = typeof textColor === 'string'
    ? textColor
    : textColor?.hex;

  return text ? (
    <section
      className="hero-block-main"
      style={{
        backgroundColor: bgColor,
        textAlign: alignment,
        color: txtColor,
      }}
    >
      <div className='hero-block-border'></div>
      <div className="hero-block-content">
        <p className='hero-block-subtitle'> {subtitle}</p>
        <PortableText value={text} />
      </div>
    </section>
  ) : null;
}