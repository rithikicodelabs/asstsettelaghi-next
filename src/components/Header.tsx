'use client';

import { useEffect } from 'react';
import { useHeaderStore } from '@/store/headerStore';
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  LinkList,
  LinkListItem,
  Navbar,
} from 'design-react-kit';
import Link from 'next/link';
import Image from 'next/image';
import Branding from './Branding';
import MobileNavDrawer from './MobileNavDrawer';
import { useMobileNavStore } from '@/store/mobileNavStore';

export default function Header() {
  const { headerData, isLoading, error, fetchHeaderData } = useHeaderStore();
  const { toggleDrawer, toggleSearch, toggleLanguage } = useMobileNavStore();

  useEffect(() => {
    fetchHeaderData();
  }, [fetchHeaderData]);

  if (isLoading) {
    return (
      <div>
        <div role="status">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Header error:', error);
    return <Navbar />;
  }

  if (!headerData) {
    return <Navbar />;
  }
  return (
    <header className="it-header-wrapper">
      {/* Top Bar */}
      <div className="it-header-slim-wrapper bgDarkTeal">
        <div className="container-xxl">
          <div className="row">
            {headerData.topBar && (
              <div className="col-12">
                <div className="it-header-slim-wrapper-content it-header-slim-links">
                  <div className="navbar-brand">
                    {headerData.topBar.regionalPortal && (
                      <a
                        href={headerData.topBar.regionalPortal.url || '#'}
                        target={
                          headerData.topBar.regionalPortal.openInNewTab
                            ? '_blank'
                            : '_self'
                        }
                        rel={
                          headerData.topBar.regionalPortal.openInNewTab
                            ? 'noopener noreferrer'
                            : ''
                        }
                        className="leftHeadingLink"
                      >
                        {headerData.topBar.regionalPortal.label}
                      </a>
                    )}
                  </div>

                  <div className="it-header-slim-right-zone">
                    {/* Desktop Language Dropdown */}
                    <Dropdown className="me-3 top-slim-dropdown d-none d-md-block">
                      <DropdownToggle caret color="primary">
                        <span className="me-3">ITA</span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <LinkList>
                          <LinkListItem inDropdown>EN</LinkListItem>
                        </LinkList>
                      </DropdownMenu>
                    </Dropdown>

                    {/* Mobile Language Button */}
                    <button 
                      className="btn btn-link text-white d-md-none me-2"
                      onClick={toggleLanguage}
                      style={{ textDecoration: 'none' }}
                    >
                      ITA
                    </button>

                    {headerData.topBar.personalArea && (
                      <Link
                        href={headerData.topBar.personalArea.url || '#'}
                        target={
                          headerData.topBar.personalArea.openInNewTab
                            ? '_blank'
                            : '_self'
                        }
                        rel={
                          headerData.topBar.personalArea.openInNewTab
                            ? 'noopener noreferrer'
                            : ''
                        }
                        className="list-item d-flex align-items-center avatarLink"
                      >
                        <div className="avatar size-sm">
                          {headerData.topBar.personalArea.icon && (
                            <Image
                              src={headerData.topBar.personalArea.icon}
                              width={32}
                              height={32}
                              alt="profile-icon"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <span className="ml-10px d-block avatarLabel d-none d-sm-inline">
                          {headerData.topBar.personalArea.label}
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Top Bar */}

      {/* Middle Bar */}
      {headerData.middleBar && (
        <div className="it-nav-wrapper it-nav-center-wrapper">
          <div className="it-header-center-wrapper bgTeal py-4">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <div className="it-header-center-content-wrapper">
                    <div className="it-brand-wrapper d-flex w-100 justify-content-between align-items-center">
                      {/* Branding - Hidden on mobile */}
                      <div className="d-none d-md-block flex-grow-1">
                        <Branding 
                          variant="header" 
                          showLogo={true}
                          showName={true}
                          showTagline={true}
                          showSocialLinks={false}
                        />
                      </div>

                      {/* Mobile Branding - Simplified */}
                      <div className="d-md-none">
                        <Branding 
                          variant="header" 
                          showLogo={true}
                          showName={true}
                          showTagline={false}
                          showSocialLinks={false}
                        />
                      </div>

                      <div className="it-header-middle-links d-flex align-items-center justify-content-between">
                        {/* Desktop Social Links */}
                        <div className="d-none d-md-flex align-items-center gap-3">
                          {headerData.middleBar.socialLabel && (
                            <span className="text-white">
                              {headerData.middleBar.socialLabel}
                            </span>
                          )}

                          <Branding 
                            variant="header" 
                            showLogo={false}
                            showName={false}
                            showTagline={false}
                            showSocialLinks={true}
                          />
                        </div>

                        {/* Mobile Action Buttons */}
                        <div className="d-flex d-md-none gap-2">
                          <button 
                            className="btn btn-link text-white p-2"
                            onClick={toggleSearch}
                            style={{ textDecoration: 'none' }}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                          </button>
                        </div>

                        {/* Desktop Global Search */}
                        <div className="d-none d-md-block">
                          {headerData.middleBar.searchEnabled &&
                            headerData.middleBar.searchLabel && (
                              <button className="src-btn d-flex gap-3 align-items-center bg-transparent text-white">
                                {headerData.middleBar.searchLabel}
                                <img src="/assets/icons/src.svg" alt="search" />
                              </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                          className="btn btn-link text-white d-md-none p-2"
                          onClick={toggleDrawer}
                          style={{ textDecoration: 'none' }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation - Desktop Only */}
      {headerData.mainNavigation &&
        headerData.mainNavigation.mainNavigationItem &&
        headerData.mainNavigation.mainNavigationItem.length > 0 && (
          <nav className="d-none d-md-block">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <ul className="nav nav-pills">
                    {headerData.mainNavigation.mainNavigationItem.map(
                      (item, itemIndex) => (
                        <li key={itemIndex} className="nav-item">
                          <a
                            href={item.url || '#'}
                            target={item.openInNewTab ? '_blank' : '_self'}
                            rel={item.openInNewTab ? 'noopener noreferrer' : ''}
                            aria-label={item.ariaLabel || undefined}
                            className="nav-link text-white"
                          >
                            {item.icon && <i></i>}
                            {item.label}
                          </a>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        )}

      {/* Bottom Bar - Desktop Only */}
      {headerData.bottomBar &&
        headerData.bottomBar.phoneNumbers &&
        headerData.bottomBar.phoneNumbers.length > 0 && (
          <div className="d-none d-md-block bg-light">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center py-2">
                    {headerData.bottomBar.phoneNumbers.map(
                      (phone, phoneIndex) => (
                        <div key={phoneIndex} className="d-flex align-items-center">
                          <span className="me-2">{phone.label}</span>
                          <a href={`tel:${phone.phoneNumber}`} className="text-decoration-none">
                            {phone.phoneNumber}
                          </a>
                          {phone.callToAction && (
                            <span className="ms-2">{phone.callToAction}</span>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer />
    </header>
  );
}
