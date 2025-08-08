'use client';

import React from 'react';
import { useBrandingContext } from './BrandingProvider';

export const BrandingDebug: React.FC = () => {
  const { brandingData, isLoading, error } = useBrandingContext();

  if (isLoading) return <div>Loading branding data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!brandingData) return <div>No branding data available</div>;

  return (
    <div className="bg-light p-3 rounded mb-3">
      <h6>Branding Debug Info:</h6>
      <div className="small">
        <div><strong>Name:</strong> {brandingData.name}</div>
        <div><strong>TagLine:</strong> {brandingData.tagLine || 'null'}</div>
        <div><strong>Logo URL:</strong> {brandingData.logo?.url || 'null'}</div>
        <div><strong>VAT Number:</strong> {brandingData.vatNumber || 'null'}</div>
        <div><strong>Social Links:</strong> {brandingData.socialLinks?.length || 0} items</div>
        <div><strong>Contacts:</strong> {brandingData.contacts?.length || 0} items</div>
        <div><strong>Address:</strong> {brandingData.mainAddress?.full_address || 'null'}</div>
      </div>
    </div>
  );
}; 