'use client';

import React from 'react';
import { useMobileNavStore } from '@/store/mobileNavStore';
import { useBrandingContext } from './BrandingProvider';
import { useHeaderStore } from '@/store/headerStore';
import Link from 'next/link';
import Image from 'next/image';
import IconCollection from './IconCollection/IconCollection';

const MobileNavDrawer: React.FC = () => {
  const { isDrawerOpen, closeDrawer } = useMobileNavStore();
  const { brandingData } = useBrandingContext();
  const { headerData } = useHeaderStore();

  console.log(brandingData);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.832 22.25V12.7604H17.1213L17.6142 9.05208H13.832V6.67708C13.832 5.63542 14.1427 4.875 15.7285 4.875H17.732V1.5625C16.7569 1.46197 15.7769 1.41329 14.7963 1.41667C11.882 1.41667 9.88917 3.14583 9.88917 6.3125V9.04167H6.6106V12.7604H9.88917V22.25H13.832Z"
              fill="#07768D"
            />
          </svg>
        );
      case 'linkedin':
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.84508 21.333H2.97508V8.87049H6.84508V21.333ZM4.908 7.17049C3.6705 7.17049 2.66675 6.14549 2.66675 4.908C2.66675 4.31358 2.90288 3.74351 3.32319 3.32319C3.74351 2.90288 4.31358 2.66675 4.908 2.66675C5.50241 2.66675 6.07249 2.90288 6.4928 3.32319C6.91312 3.74351 7.14925 4.31358 7.14925 4.908C7.14925 6.14549 6.14508 7.17049 4.908 7.17049ZM21.3292 21.333H17.4676V15.2663C17.4676 13.8205 17.4384 11.9663 15.4555 11.9663C13.4434 11.9663 13.1351 13.5372 13.1351 15.1622V21.333H9.26925V8.87049H12.9809V10.5705H13.0351C13.5517 9.59132 14.8138 8.55799 16.6967 8.55799C20.6134 8.55799 21.3334 11.1372 21.3334 14.4872V21.333H21.3292Z"
              fill="#07768D"
            />
          </svg>
        );
      case 'whatsapp':
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.2425 4.34635C18.2912 3.3881 17.159 2.62833 15.9117 2.11114C14.6644 1.59394 13.3268 1.32963 11.9765 1.33354C6.3119 1.33354 1.70243 5.943 1.70243 11.6076C1.70095 13.4105 2.17336 15.182 3.07231 16.7447L1.6145 22.0669L7.06163 20.6368C8.56792 21.458 10.2563 21.8877 11.9719 21.8864H11.9765C17.6366 21.8864 22.3478 17.2769 22.3478 11.6123C22.3478 8.86788 21.1816 6.2901 19.2425 4.34635ZM11.9765 20.1555C10.446 20.1568 8.94326 19.746 7.62624 18.9661L7.31617 18.781L4.08584 19.6279L4.94664 16.4763L4.74301 16.1523C3.88748 14.7911 3.43499 13.2154 3.43792 11.6076C3.43792 6.90099 7.26989 3.06903 11.9812 3.06903C13.1028 3.06566 14.2139 3.28526 15.2499 3.71508C16.286 4.1449 17.2262 4.77637 18.016 5.57276C19.6266 7.18793 20.617 9.33068 20.6123 11.6123C20.6123 16.3236 16.6832 20.1555 11.9765 20.1555ZM16.6601 13.7597C16.4055 13.6301 15.1421 13.0099 14.906 12.9266C14.67 12.8433 14.4988 12.797 14.3276 13.0562C14.1563 13.3154 13.6658 13.8892 13.513 14.0651C13.3603 14.241 13.2122 14.2595 12.9577 14.1299C11.449 13.3755 10.4586 12.7832 9.46355 11.0754C9.19976 10.6219 9.72734 10.6543 10.2179 9.67315C10.3012 9.50192 10.2596 9.35382 10.1948 9.22424C10.13 9.09465 9.61627 7.83122 9.40339 7.31751C9.19513 6.81769 8.98224 6.88711 8.82489 6.87785C8.67679 6.8686 8.50556 6.8686 8.33432 6.8686C8.20439 6.8722 8.07658 6.90239 7.95877 6.95731C7.84097 7.01223 7.73567 7.09072 7.64938 7.18793C7.41336 7.4471 6.75156 8.06724 6.75156 9.33068C6.75156 10.5941 7.67252 11.8159 7.79748 11.9871C7.92243 12.1584 9.60702 14.75 12.1848 15.8654C13.8138 16.5688 14.4525 16.629 15.267 16.5087C15.7622 16.4346 16.785 15.8885 16.9979 15.2869C17.2108 14.6852 17.2108 14.1715 17.146 14.0651C17.0858 13.9494 16.9146 13.8846 16.6601 13.7597Z"
              fill="#07768D"
            />
          </svg>
        );
      case 'youtube':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isDrawerOpen && (
        <div className="default-nav-drawer-backdrop" onClick={closeDrawer} />
      )}
      <div
        className={`w-100 position-fixed top-0 nav-drawer-wrapper ${isDrawerOpen ? 'open' : ''}`}
        style={{
          left: isDrawerOpen ? 0 : '-100%',
          zIndex: '1050',
        }}
      >
        <div className={`default-nav-drawer top-0`}>
          {/* Header */}
          <div className="">
            <div className="nav-drawer-branding-container mt-4 d-flex align-items-center ms-2">
              {brandingData?.logo ? (
                <Image
                  src={brandingData.logo.url}
                  alt={brandingData.logo.alternativeText || brandingData.name}
                  width={40}
                  height={40}
                  className="me-3"
                />
              ) : (
                <IconCollection name="defaultLogo" />
              )}
              <div>
                <h1 className="h1">{brandingData?.name || 'ASL Roma'}</h1>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="nav-drawer-menu-container">
            <div className="d-flex flex-column gap-4">
              {headerData?.mainNavigation?.mainNavigationItem?.map(
                (item, index) => (
                  <Link
                    key={index}
                    href={item.url || '#'}
                    className="p-0 m-0 text-decoration-none text-teal fw-semibold fs-6 lh-base"
                    onClick={closeDrawer}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Social Media Section */}
          <div className="nav-drawer-social-container">
            <h6 className="mb-2 fs-6 lh-base fw-normal">Seguici su</h6>
            <div className="d-flex gap-3">
              {brandingData?.socialLinks?.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                  aria-label={`Follow us on ${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={closeDrawer}
          className="closeBtn position-absolute top-0 mt-4 "
          aria-label="Close navigation"
        >
          <IconCollection name="modalCloseX" />
        </button>
      </div>
    </>
  );
};

export default MobileNavDrawer;
