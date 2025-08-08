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
import IconCollection from '@/components/IconCollection/IconCollection';

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
      <div className="it-header-slim-wrapper teal-dark-bg no-padding-tablet">
        <div className="container-xxl">
          <div className="row h-100">
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
                    <Dropdown className="top-slim-dropdown">
                      <DropdownToggle caret color="primary">
                        <span className="label">ITA</span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <LinkList>
                          <LinkListItem inDropdown>EN</LinkListItem>
                          <LinkListItem inDropdown>IT</LinkListItem>
                        </LinkList>
                      </DropdownMenu>
                    </Dropdown>

                    {/* Mobile Language Button */}
                    {/* <button
                      className="btn btn-link text-white d-md-none me-2"
                      onClick={toggleLanguage}
                      style={{ textDecoration: 'none' }}
                    >
                      ITA
                    </button> */}

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
                        <span className="ml-10px d-block avatarLabel d-none d-lg-inline-block">
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
          <div className="it-header-center-wrapper teal-bg  h-auto pt-0">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <div className="it-header-center-content-wrapper py-3 py-lg-4">
                    <div className="it-brand-wrapper ps-0 d-flex w-100 justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        {/* ------- Burger Menu ------- */}
                        <button
                          className="btn btn-link text-white d-lg-none ps-0 pe-3 py-2 me-1"
                          onClick={toggleDrawer}
                          style={{ textDecoration: 'none' }}
                        >
                          <IconCollection name={'burgerMenu'} />
                        </button>

                        {/* logo & name , tagline */}
                        <Branding
                          variant="header"
                          showLogo={true}
                          showName={true}
                          showTagline={true}
                          showSocialLinks={false}
                        />
                      </div>

                      {/* Mobile Branding - Simplified */}
                      {/* <div className="d-lg-none">
                        <Branding
                          variant="header"
                          showLogo={true}
                          showName={true}
                          showTagline={false}
                          showSocialLinks={false}
                        />
                      </div> */}

                      <div className="it-header-middle-links d-flex align-items-center justify-content-between">
                        {/* Desktop Social Links */}
                        <div className="d-none d-lg-flex align-items-center gap-3">
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

                        {/* Mobile src modal btn Buttons */}
                        <div className="d-flex d-md-none gap-2">
                          <button
                            className="btn btn-link p-0"
                            onClick={toggleSearch}
                            style={{ textDecoration: 'none' }}
                          >
                            <IconCollection name={'search'} />
                          </button>
                        </div>

                        {/* Desktop Global Search */}
                        <div className="d-none d-md-block">
                          {headerData.middleBar.searchEnabled &&
                            headerData.middleBar.searchLabel && (
                              <button className="src-btn d-flex gap-3 align-items-center bg-transparent text-white">
                                <span className="d-none d-lg-inline">
                                  {headerData.middleBar.searchLabel}
                                </span>

                                <Image
                                  width={40}
                                  height={40}
                                  src="/assets/icons/src.svg"
                                  alt="search"
                                />
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="it-header-slim-wrapper d-none d-lg-block teal-bg no-padding-tablet h-auto">
        <div className="container-xxl">
          <div className="row h-full">
            {/* Main Navigation */}
            {headerData.mainNavigation &&
              headerData.mainNavigation.mainNavigationItem &&
              headerData.mainNavigation.mainNavigationItem.length > 0 && (
                <div className="col-12">
                  <div className="it-header-middle-menu-wrapper">
                    <ul className="d-flex align-items-center">
                      {headerData.mainNavigation.mainNavigationItem.map(
                        (item, itemIndex) => (
                          <li key={itemIndex} className="activeLink">
                            <a
                              href={item.url || '#'}
                              target={item.openInNewTab ? '_blank' : '_self'}
                              rel={
                                item.openInNewTab ? 'noopener noreferrer' : ''
                              }
                              aria-label={item.ariaLabel || undefined}
                              className="text-white"
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
              )}
          </div>
        </div>
      </div>

      <div className="it-header-slim-wrapper no-padding-tablet teal-light-bg border-bottom border-color-grayish-cyan">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              {headerData.bottomBar &&
                headerData.bottomBar.phoneNumbers &&
                headerData.bottomBar.phoneNumbers.length > 0 && (
                  <div className="it-header-slim-left-zone-bottom d-flex justify-content-between align-items-center py-2">
                    {headerData.bottomBar.phoneNumbers.map(
                      (phone, phoneIndex) => (
                        <div
                          key={phoneIndex}
                          className="it-header-slim-left-zone-bottom-container my-1"
                        >
                          <div className="d-flex align-items-center gap-2">
                            <span className="label d-none d-md-inline">
                              {phone.label}
                            </span>
                            <Link
                              href={`tel:${phone.phoneNumber}`}
                              className="it-phone-number text-decoration-none "
                            >
                              CUP{' '}
                              <span className="text-purple text-decoration-underline ">
                                {phone.phoneNumber}
                              </span>
                            </Link>
                            <IconCollection name={'phone'} />
                          </div>

                          {phone.callToAction && (
                            <div className="d-flex align-items-center gap-2">
                              <span className="label d-none d-md-inline">
                                {phone.callToAction}
                              </span>

                              <Link
                                href="#"
                                className="it-phone-number text-decoration-none "
                              >
                                URP
                                <span className="text-purple text-decoration-underline "></span>
                              </Link>

                              <IconCollection name={'phone'} />
                            </div>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      <MobileNavDrawer />
    </header>
  );
}
