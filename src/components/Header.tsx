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

export default function Header() {
  const { headerData, isLoading, error, fetchHeaderData } = useHeaderStore();

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
    <header className="it-header-wrapper ">
      {/* Top Bar */}
      <div className="it-header-slim-wrapper bgDarkTeal">
        <div className="container-xxl ">
          <div className="row">
            {headerData.topBar && (
              <div className="col-12 ">
                <div className="it-header-slim-wrapper-content it-header-slim-links ">
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
                    <Dropdown className="me-3 top-slim-dropdown">
                      <DropdownToggle caret color="primary">
                        <span className="me-3">ITA</span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <LinkList>
                          <LinkListItem inDropdown>Azione 1</LinkListItem>
                          <LinkListItem inDropdown>Azione 2</LinkListItem>
                          <LinkListItem inDropdown>Azione 3</LinkListItem>
                        </LinkList>
                      </DropdownMenu>
                    </Dropdown>

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
                          <img
                            src="https://randomuser.me/api/portraits/men/43.jpg"
                            alt=""
                            aria-hidden="true"
                          />
                        </div>
                        <span className="ml-10px d-block avatarLabel">
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
                      <a href="d-flex align-items-center">
                        <div className="logoWrapper">
                          <img src="/assets/logo.svg" alt="logo" />
                        </div>

                        <div className="ms-3 logoText">
                          <h1>Nome dell’Istituzione</h1>
                          <h6>Tag line dell’Istituzione</h6>
                        </div>
                      </a>

                      <div className="it-header-middle-links d-flex align-items-center justify-content-between ">
                        {/* social Link */}
                        <div className="d-flex align-items-center gap-3">
                          {headerData.middleBar.socialLabel && (
                            <span className="text-white ">
                              {headerData.middleBar.socialLabel}
                            </span>
                          )}

                          <div className="it-header-social-links d-flex align-items-center gap-3">
                            <img
                              src="/assets/icons/facebook.svg"
                              alt="facebook"
                            />
                            <img
                              src="/assets/icons/twitter.svg"
                              alt="twitter"
                            />
                            <img
                              src="/assets/icons/instagram.svg"
                              alt="instagram"
                            />
                          </div>
                        </div>

                        {/* global search */}
                        <div>
                          {headerData.middleBar.searchEnabled &&
                            headerData.middleBar.searchLabel && (
                              <button className="src-btn d-flex gap-3 align-items-center bg-transparent text-white">
                                {headerData.middleBar.searchLabel}

                                <img src="/assets/icons/src.svg" alt="search" />
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

      {/* Main Navigation */}
      {headerData.mainNavigation &&
        headerData.mainNavigation.mainNavigationItem &&
        headerData.mainNavigation.mainNavigationItem.length > 0 && (
          <nav>
            <div>
              <ul>
                {headerData.mainNavigation.mainNavigationItem.map(
                  (item, itemIndex) => (
                    <li key={itemIndex}>
                      <a
                        href={item.url || '#'}
                        target={item.openInNewTab ? '_blank' : '_self'}
                        rel={item.openInNewTab ? 'noopener noreferrer' : ''}
                        aria-label={item.ariaLabel || undefined}
                      >
                        {item.icon && <i></i>}
                        {item.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </nav>
        )}

      {/* Bottom Bar */}
      {headerData.bottomBar &&
        headerData.bottomBar.phoneNumbers &&
        headerData.bottomBar.phoneNumbers.length > 0 && (
          <div>
            <div>
              <div>
                <div>
                  {headerData.bottomBar.phoneNumbers.map(
                    (phone, phoneIndex) => (
                      <div key={phoneIndex}>
                        <span>{phone.label}</span>
                        <a href={`tel:${phone.phoneNumber}`}>
                          {phone.phoneNumber}
                        </a>
                        {phone.callToAction && (
                          <span>{phone.callToAction}</span>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
    </header>
  );
}
