import React from 'react';

export default function TestFooterPage() {
  return (
    <div className="container py-4">
      <h1 className="display-4 fw-bold mb-4">Footer Test Page</h1>
      
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h3 fw-semibold mb-3">Footer Component Test</h2>
          <p className="text-muted mb-4">
            This page tests the footer component that fetches data from the Strapi API.
          </p>
          
          <div className="row g-3">
            <div className="col-12">
              <div className="alert alert-info">
                <h3 className="h6 fw-medium mb-2">Expected Behavior:</h3>
                <ul className="mb-0">
                  <li>• Footer should appear at the bottom of the page</li>
                  <li>• Should show loading state initially</li>
                  <li>• Should fetch data from /api/footer endpoint</li>
                  <li>• Should display footer links with proper styling</li>
                  <li>• Should handle different link types (internal, external, content)</li>
                </ul>
              </div>
            </div>
            
            <div className="col-12">
              <div className="alert alert-warning">
                <h3 className="h6 fw-medium mb-2">API Endpoint:</h3>
                <p className="mb-0">
                  <code className="bg-light px-2 py-1 rounded">/api/footer</code>
                </p>
              </div>
            </div>
            
            <div className="col-12">
              <div className="alert alert-success">
                <h3 className="h6 fw-medium mb-2">Fallback Data:</h3>
                <p className="mb-0">
                  If Strapi is not available, the footer will show fallback data with sample links.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card bg-light">
        <div className="card-body">
          <h2 className="h3 fw-semibold mb-3">Page Content</h2>
          <p className="text-muted">
            This content should push the footer to the bottom of the page. The footer component 
            should be visible below this content and should be properly styled with a dark background.
          </p>
          
          <div className="mt-4">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 