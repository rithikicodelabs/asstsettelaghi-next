'use client';

import React from 'react';
import Branding from '@/components/Branding';
import Contacts from '@/components/Contacts';
import { useBrandingContext } from '@/components/BrandingProvider';
import { BrandingDebug } from '@/components/BrandingDebug';

export default function TestBrandingPage() {
  const { brandingData, isLoading, error } = useBrandingContext();

  return (
    <div className="container mt-5">
      <h1>Branding Test Page</h1>
      
      <div className="row">
        <div className="col-12">
          <BrandingDebug />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h2>Raw Branding Data</h2>
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          {brandingData && (
            <pre className="bg-light p-3 rounded">
              {JSON.stringify(brandingData, null, 2)}
            </pre>
          )}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <h2>Branding Component (Header Variant)</h2>
          <div className="bg-dark p-4 rounded">
            <Branding 
              variant="header" 
              showLogo={true}
              showName={true}
              showTagline={true}
              showSocialLinks={true}
            />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <h2>Branding Component (Footer Variant)</h2>
          <div className="bg-dark p-4 rounded">
            <Branding 
              variant="footer" 
              showLogo={true}
              showName={true}
              showTagline={true}
              showSocialLinks={true}
            />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <h2>Contacts Component</h2>
          <div className="bg-dark p-4 rounded">
            <Contacts />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <h2>API Test</h2>
          <button 
            className="btn btn-primary"
            onClick={() => {
              fetch('/api/branding')
                .then(res => res.json())
                .then(data => {
                  console.log('Branding API Response:', data);
                  alert('Check console for API response');
                })
                .catch(err => {
                  console.error('Branding API Error:', err);
                  alert('API Error - check console');
                });
            }}
          >
            Test Branding API
          </button>
        </div>
      </div>
    </div>
  );
} 