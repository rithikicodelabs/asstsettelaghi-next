'use client';

import React from 'react';
import { useFooter } from '@/hooks/useFooter';
import { FooterSection, FooterLink } from '@/types/footer';
import Branding from './Branding';
import Contacts from './Contacts';
import Link from 'next/link';

const Footer: React.FC = () => {
  const { footerData, isLoading, error } = useFooter();

  if (isLoading) {
    return (
      <footer className="bg-dark text-white py-4">
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
      <div key={section.id} className="col-6 col-md-4 col-lg-3 mb-4">
        <h5 className="h6 text-light mb-3">{section.label}</h5>
        <div className="d-flex flex-column">
          {section.link.map((link) => (
            <div key={link.id} className="mb-2">
              {renderLink(link)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <footer className="teal-dark-bg text-white py-5">
      <div className="container">
        <div className="row">
          {/* Branding Section */}
          <div className="col-12 mb-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <Branding
                  variant="footer"
                  showLogo={true}
                  showName={true}
                  showTagline={true}
                  showSocialLinks={false}
                />
              </div>
              <div className="col-md-6 text-md-end">
                <div className="d-flex align-items-center justify-content-md-end">
                  <span className="text-white-50 me-3">Seguici su</span>
                  <Branding
                    variant="footer"
                    showLogo={false}
                    showName={false}
                    showTagline={false}
                    showSocialLinks={true}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer Sections */}
          <div className="col-12 mb-4">
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
