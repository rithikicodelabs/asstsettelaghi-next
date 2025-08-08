'use client';

import React from 'react';
import { useFooter } from '@/hooks/useFooter';
import { FooterSection, FooterLink } from '@/types/footer';
import Branding from './Branding';
import Contacts from './Contacts';
import Link from 'next/link';
import Image from 'next/image';
import IconCollection from './IconCollection/IconCollection';

const Footer: React.FC = () => {
  const { footerData, isLoading, error } = useFooter();

  if (isLoading) {
    return (
      <footer className="darkGreen-bg text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="placeholder-glow">
                <div className="placeholder col-3 mb-3"></div>
                <div className="placeholder col-4 mb-2"></div>
                <div className="placeholder col-2 mb-2"></div>
                <div className="placeholder col-5"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (error || !footerData) {
    return (
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="text-muted">Footer not available</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  const renderLink = (link: FooterLink) => {
    const linkClasses = `d-block text-light text-decoration-none ${
      link.style === 'button' ? 'btn btn-primary' : ''
    }`;

    const linkProps = {
      className: linkClasses,
      ...(link.openInNewTab && {
        target: '_blank',
        rel: 'noopener noreferrer',
      }),
      'aria-label': link.ariaLabel || link.label,
    };

    const linkContent = (
      <>
        {link.icon && (
          <span
            className="d-inline-block me-2"
            style={{ width: '1rem', height: '1rem' }}
          >
            {/* You can add icon rendering logic here based on the icon value */}
            {link.icon}
          </span>
        )}
        {link.label}
      </>
    );

    // Handle different link types
    switch (link.linkType) {
      case 'Url':
      case 'internal':
        return (
          <Link href={link.url} {...linkProps}>
            {linkContent}
          </Link>
        );

      case 'external':
        return (
          <a href={link.url} {...linkProps}>
            {linkContent}
          </a>
        );

      default:
        return (
          <Link href={link.url} {...linkProps}>
            {linkContent}
          </Link>
        );
    }
  };

  const renderSection = (section: FooterSection) => {
    return (
      <div
        key={section.id}
        className="col-12 col-md-4 col-lg-3 mb-4 it-footer-menu-container"
      >
        <h6 className="mb-4 ">{section.label}</h6>

        <div className="d-flex flex-column">
          {section.link.map((link) => (
            <Link
              href="#"
              key={link.id}
              className="mb-2 p-0 it-footer-menu-link"
            >
              {renderLink(link)}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <footer className="darkGreen-bg it-footer-wrapper text-white ">
      <div className="container-xxl">
        <div className="row">
          {/* Branding Section */}
          <div className="col-12">
            <div className="d-flex flex-column gap-3 gap-lg-5 flex-md-row it-branding-wrapper">
              <Branding
                variant="footer"
                showLogo={true}
                showName={true}
                showTagline={false}
                showSocialLinks={false}
              />

              <Branding
                variant="footer"
                showLogo={true}
                showName={true}
                showTagline={false}
                showSocialLinks={false}
              />
            </div>
          </div>

          {/* Main Footer Sections */}
          <div className="col-12">
            <div className="row">
              {footerData.sections.map((section) => renderSection(section))}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-top border-secondary my-4"></div>

        {/* Bottom Section with Contacts and Legal Links */}
        <div className="row">
          <div className="col-md-6">
            <Contacts />
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex flex-column gap-2">
              <a
                href="/accessibilita"
                className="text-muted text-decoration-none small"
              >
                Dichiarazione di accessibilità
              </a>
              <a href="/faq" className="text-muted text-decoration-none small">
                FAQ
              </a>
              <a
                href="/cookie"
                className="text-muted text-decoration-none small"
              >
                Informativa cookie
              </a>
              <a
                href="/privacy"
                className="text-muted text-decoration-none small"
              >
                Informativa privacy
              </a>
              <a
                href="/note-legali"
                className="text-muted text-decoration-none small"
              >
                Note legali
              </a>
              <a
                href="/mappa-sito"
                className="text-muted text-decoration-none small"
              >
                Mappa del sito
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
