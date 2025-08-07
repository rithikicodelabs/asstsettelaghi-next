'use client';

import { useHeader } from '@/hooks/useHeader';
import { testStrapiConnection, discoverContentTypes, fetchHeaderByDocumentId } from '@/lib/api';
import { useState, useEffect } from 'react';

export default function TestHeaderPage() {
  const { headerData, isLoading, error, isStale, refetch } = useHeader();
  const [strapiStatus, setStrapiStatus] = useState<{ connected: boolean; message: string } | null>(null);
  const [availableEndpoints, setAvailableEndpoints] = useState<string[]>([]);
  const [discovering, setDiscovering] = useState(false);
  const [documentIdData, setDocumentIdData] = useState<any>(null);
  const [documentId, setDocumentId] = useState('qan5rnuvvd226v26bu44h6bm');

  useEffect(() => {
    const checkStrapiConnection = async () => {
      const status = await testStrapiConnection();
      setStrapiStatus(status);
    };
    checkStrapiConnection();
  }, []);

  const handleDiscoverEndpoints = async () => {
    setDiscovering(true);
    try {
      const endpoints = await discoverContentTypes();
      setAvailableEndpoints(endpoints);
    } catch (error) {
      console.error('Error discovering endpoints:', error);
    } finally {
      setDiscovering(false);
    }
  };

  const handleFetchByDocumentId = async () => {
    try {
      const data = await fetchHeaderByDocumentId(documentId);
      setDocumentIdData(data);
    } catch (error) {
      console.error('Error fetching by document ID:', error);
      setDocumentIdData(null);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Header Test Page</h1>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Header Status</h5>
            </div>
            <div className="card-body">
              <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
              <p><strong>Error:</strong> {error || 'None'}</p>
              <p><strong>Data Stale:</strong> {isStale ? 'Yes' : 'No'}</p>
              <p><strong>Has Data:</strong> {headerData ? 'Yes' : 'No'}</p>
              
              <div className="mt-3">
                <h6>Strapi Connection Status:</h6>
                {strapiStatus ? (
                  <div className={`alert ${strapiStatus.connected ? 'alert-success' : 'alert-warning'}`}>
                    <strong>{strapiStatus.connected ? '✅ Connected' : '⚠️ Not Connected'}</strong><br/>
                    {strapiStatus.message}
                  </div>
                ) : (
                  <div className="alert alert-info">Checking connection...</div>
                )}
              </div>
              
              <button 
                className="btn btn-primary mt-3" 
                onClick={refetch}
                disabled={isLoading}
              >
                {isLoading ? 'Refreshing...' : 'Refresh Header Data'}
              </button>

              <div className="mt-3">
                <h6>Discover Available Endpoints:</h6>
                <button 
                  className="btn btn-outline-info" 
                  onClick={handleDiscoverEndpoints}
                  disabled={discovering}
                >
                  {discovering ? 'Discovering...' : 'Discover Endpoints'}
                </button>
                
                {availableEndpoints.length > 0 && (
                  <div className="mt-2">
                    <strong>Available endpoints:</strong>
                    <ul className="list-unstyled">
                      {availableEndpoints.map((endpoint, index) => (
                        <li key={index} className="badge bg-success me-1">
                          /{endpoint}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-3">
                <h6>Test Document ID Fetch:</h6>
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={documentId}
                    onChange={(e) => setDocumentId(e.target.value)}
                    placeholder="Enter document ID"
                  />
                  <button 
                    className="btn btn-outline-secondary" 
                    onClick={handleFetchByDocumentId}
                  >
                    Fetch by ID
                  </button>
                </div>
                
                {documentIdData && (
                  <div className="mt-2">
                    <strong>Document ID Data:</strong>
                    <pre style={{ fontSize: '0.8rem', maxHeight: '200px', overflow: 'auto' }}>
                      {JSON.stringify(documentIdData, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Header Data</h5>
            </div>
            <div className="card-body">
              {headerData ? (
                <pre style={{ fontSize: '0.8rem', maxHeight: '400px', overflow: 'auto' }}>
                  {JSON.stringify(headerData, null, 2)}
                </pre>
              ) : (
                <p>No header data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 