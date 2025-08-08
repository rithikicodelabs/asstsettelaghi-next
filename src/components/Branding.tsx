'use client';

import React from 'react';
import { useBrandingContext } from './BrandingProvider';
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.8328 22.25V12.7604H17.122L17.6149 9.05208H13.8328V6.67708C13.8328 5.63542 14.1435 4.875 15.7292 4.875H17.7328V1.5625C16.7576 1.46197 15.7776 1.41329 14.797 1.41667C11.8828 1.41667 9.8899 3.14583 9.8899 6.3125V9.04167H6.61133V12.7604H9.8899V22.25H13.8328Z"
              fill="white"
            />
          </svg>
        );
      case 'instagram':
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6715 7.21406C10.7249 7.21406 9.79962 7.49475 9.01258 8.02063C8.22554 8.54651 7.61212 9.29397 7.24989 10.1685C6.88766 11.043 6.79288 12.0053 6.97755 12.9336C7.16221 13.862 7.61802 14.7148 8.28734 15.3841C8.95666 16.0534 9.80943 16.5092 10.7378 16.6939C11.6662 16.8786 12.6285 16.7838 13.503 16.4216C14.3775 16.0593 15.1249 15.4459 15.6508 14.6589C16.1767 13.8718 16.4574 12.9465 16.4574 12C16.4584 11.3712 16.3353 10.7484 16.0951 10.1673C15.8549 9.58621 15.5024 9.05823 15.0578 8.61362C14.6132 8.16901 14.0852 7.81652 13.5041 7.57636C12.923 7.33619 12.3003 7.21307 11.6715 7.21406ZM11.6715 15.1114C11.0561 15.1114 10.4545 14.9289 9.94285 14.587C9.43117 14.2452 9.03237 13.7592 8.79687 13.1907C8.56137 12.6221 8.49975 11.9965 8.61981 11.3929C8.73987 10.7894 9.03621 10.235 9.47135 9.79983C9.9065 9.36468 10.4609 9.06834 11.0645 8.94829C11.668 8.82823 12.2936 8.88985 12.8622 9.12535C13.4307 9.36085 13.9167 9.75965 14.2586 10.2713C14.6005 10.783 14.7829 11.3846 14.7829 12C14.7814 12.8247 14.4531 13.6152 13.8699 14.1984C13.2867 14.7816 12.4962 15.1099 11.6715 15.1114ZM17.7694 7.01829C17.7694 7.23908 17.704 7.4549 17.5813 7.63847C17.4587 7.82205 17.2843 7.96512 17.0803 8.04961C16.8764 8.1341 16.6519 8.15621 16.4354 8.11314C16.2188 8.07007 16.0199 7.96375 15.8638 7.80763C15.7077 7.65152 15.6014 7.45261 15.5583 7.23607C15.5152 7.01953 15.5373 6.79508 15.6218 6.59111C15.7063 6.38713 15.8494 6.21279 16.033 6.09013C16.2165 5.96747 16.4324 5.902 16.6532 5.902C16.7998 5.90167 16.9451 5.93032 17.0807 5.9863C17.2163 6.04228 17.3395 6.1245 17.4432 6.22822C17.5469 6.33194 17.6292 6.45513 17.6851 6.59072C17.7411 6.7263 17.7698 6.87161 17.7694 7.01829ZM20.9392 8.15125C20.8684 6.65592 20.5269 5.33136 19.4314 4.24006C18.3359 3.14876 17.0155 2.8072 15.5202 2.73223C13.979 2.64476 9.35976 2.64476 7.81861 2.73223C6.32744 2.80304 5.00288 3.14459 3.90742 4.23589C2.81195 5.32719 2.47456 6.65175 2.39959 8.14708C2.31212 9.68823 2.31212 14.3075 2.39959 15.8487C2.4704 17.344 2.81195 18.6686 3.90742 19.7599C5.00288 20.8512 6.32327 21.1927 7.81861 21.2677C9.35976 21.3552 13.979 21.3552 15.5202 21.2677C17.0155 21.1969 18.3401 20.8553 19.4314 19.7599C20.5227 18.6644 20.8642 17.344 20.9392 15.8487C21.0267 14.3075 21.0267 9.6924 20.9392 8.15125ZM18.9482 17.5023C18.7898 17.9038 18.5506 18.2686 18.2453 18.5738C17.9401 18.879 17.5754 19.1183 17.1738 19.2767C15.9451 19.764 13.0294 19.6516 11.6715 19.6516C10.3136 19.6516 7.39375 19.7599 6.16916 19.2767C5.7676 19.1183 5.40289 18.879 5.09765 18.5738C4.79241 18.2686 4.55316 17.9038 4.39475 17.5023C3.90742 16.2735 4.01988 13.3578 4.01988 12C4.01988 10.6421 3.91158 7.72223 4.39475 6.49763C4.55316 6.09608 4.79241 5.73136 5.09765 5.42612C5.40289 5.12089 5.7676 4.88164 6.16916 4.72323C7.39791 4.23589 10.3136 4.34835 11.6715 4.34835C13.0294 4.34835 15.9492 4.24006 17.1738 4.72323C17.5754 4.88164 17.9401 5.12089 18.2453 5.42612C18.5506 5.73136 18.7898 6.09608 18.9482 6.49763C19.4356 7.72639 19.3231 10.6421 19.3231 12C19.3231 13.3578 19.4356 16.2777 18.9482 17.5023Z"
              fill="white"
            />
          </svg>
        );
      case 'twitter':
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.0877 7.6519C20.1014 7.84107 20.1014 8.03065 20.1014 8.22024C20.1014 14.0002 15.7018 20.6602 7.66143 20.6602C5.28101 20.6664 2.94948 19.9848 0.947266 18.6973C1.29784 18.7361 1.6504 18.7542 2.0031 18.7515C3.97089 18.7564 5.883 18.0984 7.43102 16.8836C6.51869 16.867 5.63434 16.5658 4.90145 16.0222C4.16857 15.4786 3.62376 14.7197 3.3431 13.8515C3.61631 13.8946 3.89236 13.9171 4.16893 13.919C4.55713 13.9178 4.94363 13.8679 5.31935 13.7702C4.32938 13.5696 3.43934 13.0325 2.80031 12.2502C2.16128 11.468 1.81262 10.4887 1.81352 9.47857V9.42482C2.41937 9.76279 3.09652 9.95282 3.78977 9.9794C2.86179 9.36059 2.20501 8.41091 1.9535 7.32426C1.70199 6.23761 1.87472 5.09593 2.43643 4.13232C3.53463 5.48404 4.90466 6.58986 6.45769 7.37808C8.01072 8.16629 9.71208 8.6193 11.4514 8.70774C11.3815 8.37895 11.3452 8.04388 11.3431 7.70774C11.3432 6.83049 11.6071 5.97353 12.1004 5.24813C12.5937 4.52273 13.2937 3.96238 14.1095 3.63983C14.9253 3.31729 15.8192 3.24744 16.6752 3.43936C17.5312 3.63127 18.3098 4.0761 18.9098 4.71607C19.8889 4.52752 20.8279 4.17026 21.6848 3.66024C21.3589 4.67072 20.6755 5.52753 19.7627 6.06982C20.6311 5.97024 21.4798 5.74146 22.2806 5.39107C21.682 6.26264 20.9406 7.02698 20.0877 7.6519Z"
              fill="white"
            />
          </svg>
        );
      case 'youtube':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
          <div
            className="logoContainer"
            // style={{
            //   width: brandingData.logo.width || 40,
            //   height: brandingData.logo.height || 40,
            // }}
          >
            <Image
              fill
              src={brandingData.logo.url}
              alt={brandingData.logo.alternativeText || brandingData.name}
              // width={brandingData.logo.width || 40}
              // height={brandingData.logo.height || 40}
              className="branding-logo"
            />
          </div>
        )}
        {showLogo && !brandingData.logo && (
          <div className="me-3">
            <div
              className="bg-white rounded p-2"
              style={{ width: '40px', height: '40px' }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-dark"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </div>
        )}

        {/* Name and Tagline */}
        <div className="flex-grow-1 logoText">
          {showName && (
            <div
              className={`branding-name ${variant === 'header' ? 'h1' : 'h6'} text-white mb-0`}
            >
              {brandingData.name}
            </div>
          )}

          EP955918485IN

          {showTagline && brandingData.tagLine && (
            <div className="branding-tagline small d-none d-lg-block">
              {brandingData.tagLine}
            </div>
          )}

          {showTagline && !brandingData.tagLine && variant === 'header' && (
            <div className="branding-tagline small d-none d-lg-block">
              Portale Sanitario Regionale
            </div>
          )}
        </div>

        {/* Social Links */}
        {showSocialLinks &&
          brandingData.socialLinks &&
          brandingData.socialLinks.length > 0 && (
            <div className="branding-social ms-3">
              <div className="d-flex gap-3">
                {brandingData.socialLinks.map(
                  (social: { id: number; platform: string; url: string }) => (
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
                  ),
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Branding;
