'use client';

import { useEffect } from 'react';
import { useHeaderStore } from '@/store/headerStore';
import { Navbar } from 'design-react-kit';

export default function Header() {
  const { headerData, isLoading, error, fetchHeaderData } = useHeaderStore();

  useEffect(() => {
    fetchHeaderData();
  }, [fetchHeaderData]);

  if (isLoading) {
    return (
      <div className="header-loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Header error:', error);
    // Fallback to basic navbar if there's an error
    return <Navbar />;
  }

  if (!headerData) {
    return <Navbar />;
  }

  return (
    <header className="header">
      {/* Top Bar */}
      {headerData.topBar && (
        <div className="header-top-bar">
          <div className="container">
            <div className="row">
              <div className="col">
                {headerData.topBar.regionalPortal && (
                  <a 
                    href={headerData.topBar.regionalPortal.url || '#'}
                    target={headerData.topBar.regionalPortal.openInNewTab ? '_blank' : '_self'}
                    rel={headerData.topBar.regionalPortal.openInNewTab ? 'noopener noreferrer' : ''}
                    className="regional-portal-link"
                  >
                    {headerData.topBar.regionalPortal.label}
                  </a>
                )}
              </div>
              <div className="col text-end">
                {headerData.topBar.personalArea && (
                  <a 
                    href={headerData.topBar.personalArea.url || '#'}
                    target={headerData.topBar.personalArea.openInNewTab ? '_blank' : '_self'}
                    rel={headerData.topBar.personalArea.openInNewTab ? 'noopener noreferrer' : ''}
                    className="personal-area-link"
                  >
                    {headerData.topBar.personalArea.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Middle Bar */}
      {headerData.middleBar && (
        <div className="header-middle-bar">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                {headerData.middleBar.socialLabel && (
                  <span className="social-label">{headerData.middleBar.socialLabel}</span>
                )}
              </div>
              <div className="col text-end">
                {headerData.middleBar.searchEnabled && headerData.middleBar.searchLabel && (
                  <button className="btn btn-outline-primary search-btn">
                    {headerData.middleBar.searchLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      {headerData.mainNavigation && headerData.mainNavigation.mainNavigationItem && headerData.mainNavigation.mainNavigationItem.length > 0 && (
        <nav className="header-main-navigation">
          <div className="container">
            <ul className="nav nav-pills">
              {headerData.mainNavigation.mainNavigationItem.map((item, itemIndex) => (
                <li key={itemIndex} className="nav-item">
                  <a 
                    className="nav-link"
                    href={item.url || '#'}
                    target={item.openInNewTab ? '_blank' : '_self'}
                    rel={item.openInNewTab ? 'noopener noreferrer' : ''}
                    aria-label={item.ariaLabel || undefined}
                  >
                    {item.icon && <i className={`icon-${item.icon}`}></i>}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      {/* Bottom Bar */}
      {headerData.bottomBar && headerData.bottomBar.phoneNumbers && headerData.bottomBar.phoneNumbers.length > 0 && (
        <div className="header-bottom-bar">
          <div className="container">
            <div className="bottom-bar-section">
              <div className="phone-numbers">
                {headerData.bottomBar.phoneNumbers.map((phone, phoneIndex) => (
                  <div key={phoneIndex} className="phone-number-item">
                    <span className="phone-label">{phone.label}</span>
                    <a 
                      href={`tel:${phone.phoneNumber}`}
                      className="phone-link"
                    >
                      {phone.phoneNumber}
                    </a>
                    {phone.callToAction && (
                      <span className="call-to-action">{phone.callToAction}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 