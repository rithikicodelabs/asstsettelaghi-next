'use client';

import React from 'react';
import { useBrandingContext } from './BrandingProvider';

interface ContactsProps {
  className?: string;
}

const Contacts: React.FC<ContactsProps> = ({ className = '' }) => {
  const { brandingData, isLoading, error } = useBrandingContext();

  if (isLoading) {
    return (
      <div className={`contacts-placeholder ${className}`}>
        <div className="placeholder-glow">
          <div className="placeholder col-4 mb-2"></div>
          <div className="placeholder col-3 mb-2"></div>
          <div className="placeholder col-5 mb-2"></div>
          <div className="placeholder col-4"></div>
        </div>
      </div>
    );
  }

  if (error || !brandingData) {
    return (
      <div className={`contacts-fallback ${className}`}>
        <p className="text-muted small mb-0">Contatti non disponibili</p>
      </div>
    );
  }

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19c-.54 0-.99.45-.99.99 0 9.36 7.6 16.96 16.96 16.96.54 0 .99-.45.99-.99v-3.5c0-.54-.45-.99-.99-.99z"/>
          </svg>
        );
      case 'email':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        );
      case 'pec':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        );
      case 'fax':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"/>
          </svg>
        );
      case 'website':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getContactLink = (contact: { id: number; type: string; value: string; label?: string }) => {
    const icon = getContactIcon(contact.type);
    
    switch (contact.type) {
      case 'phone':
        return (
          <a 
            href={`tel:${contact.value}`} 
            className="text-light text-decoration-none d-flex align-items-center gap-2"
          >
            {icon}
            <span>{contact.label || contact.value}</span>
          </a>
        );
      case 'email':
      case 'pec':
        return (
          <a 
            href={`mailto:${contact.value}`} 
            className="text-light text-decoration-none d-flex align-items-center gap-2"
          >
            {icon}
            <span>{contact.label || contact.value}</span>
          </a>
        );
      case 'website':
        return (
          <a 
            href={contact.value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-light text-decoration-none d-flex align-items-center gap-2"
          >
            {icon}
            <span>{contact.label || contact.value}</span>
          </a>
        );
      default:
        return (
          <div className="text-light d-flex align-items-center gap-2">
            {icon}
            <span>{contact.label || contact.value}</span>
          </div>
        );
    }
  };

  return (
    <div className={`contacts ${className}`}>
      <h6 className="text-light mb-3">CONTATTI</h6>
      
      {/* Address */}
      {brandingData.mainAddress && (
        <div className="mb-3">
          <div className="text-light small">
            {brandingData.mainAddress.full_address || 
              `${brandingData.mainAddress.street}, ${brandingData.mainAddress.streetNumber} ${brandingData.mainAddress.zip_code} ${brandingData.mainAddress.city} (${brandingData.mainAddress.province})`}
          </div>
        </div>
      )}

      {/* Contacts */}
      {brandingData.contacts.map((contact: { id: number; type: string; value: string; label?: string }) => (
        <div key={contact.id} className="mb-2">
          {getContactLink(contact)}
        </div>
      ))}

      {/* VAT Number */}
      {brandingData.vatNumber && (
        <div className="mb-2">
          <div className="text-light small">
            P.IVA {brandingData.vatNumber}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts; 