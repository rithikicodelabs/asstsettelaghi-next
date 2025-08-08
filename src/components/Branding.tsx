'use client';

import React from 'react';
import { useBrandingContext } from './BrandingProvider';
import Link from 'next/link';
import Image from 'next/image';

interface BrandingProps {
  variant?: 'header' | 'footer';
  showLogo?: boolean;
  showName?: boolean;
  showTagline?: boolean;
  showSocialLinks?: boolean;
  className?: string;
}

const Branding: React.FC<BrandingProps> = ({
  variant = 'header',
  showLogo = true,
  showName = true,
  showTagline = true,
  showSocialLinks = true,
  className = '',
}) => {
  const { brandingData, isLoading, error } = useBrandingContext();

  if (isLoading) {
    return (
      <div className={`branding-placeholder ${className}`}>
        <div className="placeholder-glow">
          <div className="placeholder col-3 mb-2"></div>
          <div className="placeholder col-2"></div>
        </div>
      </div>
    );
  }

  if (error || !brandingData) {
    return (
      <div className={`branding-fallback ${className}`}>
        <span className="text-white">Nome della ASL</span>
      </div>
    );
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      default:
        return null;
    }
  };
  // console.log('brandingData', brandingData)
  return (
    <div className={`branding ${className}`}>
      <div className="d-flex align-items-center">
        {/* Logo */}
        {showLogo && brandingData.logo && (
          <div className="me-3">
            <Image
              src={brandingData.logo.url}
              alt={brandingData.logo.alternativeText || brandingData.name}
              width={brandingData.logo.width || 40}
              height={brandingData.logo.height || 40}
              className="branding-logo"
            />
          </div>
        )}
        {showLogo && !brandingData.logo && (
          <div className="me-3">
            <div className="bg-white rounded p-2" style={{ width: '40px', height: '40px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-dark">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
        )}

        {/* Name and Tagline */}
        <div className="flex-grow-1">
          {showName && (
            <div className={`branding-name ${variant === 'header' ? 'h5' : 'h6'} text-white mb-0`}>
              {brandingData.name}
            </div>
          )}
          {showTagline && brandingData.tagLine && (
            <div className="branding-tagline text-white-50 small">
              {brandingData.tagLine}
            </div>
          )}
          {showTagline && !brandingData.tagLine && variant === 'header' && (
            <div className="branding-tagline text-white-50 small">
              Portale Sanitario Regionale
            </div>
          )}
        </div>

        {/* Social Links */}
        {showSocialLinks && brandingData.socialLinks && brandingData.socialLinks.length > 0 && (
          <div className="branding-social ms-3">
            <div className="d-flex gap-2">
              {brandingData.socialLinks.map((social: any) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                  aria-label={`Follow us on ${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Branding; 