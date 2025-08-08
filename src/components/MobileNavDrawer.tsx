'use client';

import React from 'react';
import { useMobileNavStore } from '@/store/mobileNavStore';
import { useBrandingContext } from './BrandingProvider';
import { useHeaderStore } from '@/store/headerStore';
import Link from 'next/link';
import Image from 'next/image';

const MobileNavDrawer: React.FC = () => {
  const { isDrawerOpen, closeDrawer } = useMobileNavStore();
  const { brandingData } = useBrandingContext();
  const { headerData } = useHeaderStore();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'whatsapp':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isDrawerOpen && (
        <div 
          className="mobile-nav-backdrop"
          onClick={closeDrawer}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1040,
          }}
        />
      )}

      {/* Drawer */}
      <div 
        className={`mobile-nav-drawer ${isDrawerOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: isDrawerOpen ? 0 : '-100%',
          width: '280px',
          height: '100vh',
          backgroundColor: 'white',
          zIndex: 1050,
          transition: 'left 0.3s ease-in-out',
          overflowY: 'auto',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Header */}
        <div className="p-3 border-bottom">
          <div className="d-flex align-items-center">
            {brandingData?.logo ? (
              <Image
                src={brandingData.logo.url}
                alt={brandingData.logo.alternativeText || brandingData.name}
                width={40}
                height={40}
                className="me-3"
              />
            ) : (
              <div className="bg-primary rounded p-2 me-3" style={{ width: '40px', height: '40px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            )}
            <div>
              <h6 className="mb-0 text-primary fw-bold">{brandingData?.name || 'ASL Roma'}</h6>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-3">
          <nav className="nav flex-column">
            {headerData?.mainNavigation?.mainNavigationItem?.map((item, index) => (
              <Link
                key={index}
                href={item.url || '#'}
                className="nav-link text-primary py-2 px-0 border-0"
                onClick={closeDrawer}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Social Media Section */}
        <div className="p-3 border-top mt-auto">
          <h6 className="text-primary mb-3">Seguici su</h6>
          <div className="d-flex gap-3">
            {brandingData?.socialLinks?.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-decoration-none"
                aria-label={`Follow us on ${social.platform}`}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={closeDrawer}
          className="btn-close position-absolute"
          style={{
            top: '1rem',
            right: '1rem',
            zIndex: 1060,
          }}
          aria-label="Close navigation"
        />
      </div>
    </>
  );
};

export default MobileNavDrawer; 