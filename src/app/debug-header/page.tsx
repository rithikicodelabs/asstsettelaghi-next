'use client';

import { useState } from 'react';
import { testStrapiConnection, fetchHeaderByDocumentId } from '@/lib/api';

export default function DebugHeaderPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [documentId, setDocumentId] = useState('qan5rnuvvd226v26bu44h6bm');

  const runDebug = async () => {
    setLoading(true);
    setDebugInfo(null);
    
    const debugData: any = {
      timestamp: new Date().toISOString(),
      steps: []
    };

    try {
      // Step 1: Test connection
      debugData.steps.push('Step 1: Testing Strapi connection...');
      const connection = await testStrapiConnection();
      debugData.connection = connection;
      debugData.steps.push(`✅ Connection: ${connection.connected ? 'SUCCESS' : 'FAILED'} - ${connection.message}`);

      if (connection.connected) {
        // Step 2: Try to get raw header data
        debugData.steps.push('Step 2: Fetching raw header data...');
        try {
          const response = await fetch('http://localhost:1373/api/header');
          const rawData = await response.json();
          debugData.rawHeaderData = rawData;
          debugData.steps.push(`✅ Raw header data fetched: ${JSON.stringify(rawData).substring(0, 200)}...`);
        } catch (error) {
          debugData.steps.push(`❌ Raw header fetch failed: ${error}`);
        }

        // Step 3: Try with document ID
        debugData.steps.push('Step 3: Fetching with document ID...');
        try {
          const headerData = await fetchHeaderByDocumentId(documentId);
          debugData.headerData = headerData;
          debugData.steps.push(`✅ Header data by ID: ${headerData ? 'SUCCESS' : 'FAILED'}`);
        } catch (error) {
          debugData.steps.push(`❌ Header data by ID failed: ${error}`);
        }

        // Step 4: Test multiple approaches
        debugData.steps.push('Step 4: Testing multiple API approaches...');
        
        const approaches = [
          {
            name: 'Simple populate',
            url: 'http://localhost:1373/api/header?populate=*'
          },
          {
            name: 'URL-encoded populate',
            url: 'http://localhost:1373/api/header?populate[topBar][populate]=*&populate[middleBar][populate]=*&populate[mainNavigation][populate]=*&populate[bottomBar][populate]=*'
          },
          {
            name: 'Direct endpoint',
            url: 'http://localhost:1373/api/header'
          }
        ];
        
        debugData.approaches = {};
        
        for (const approach of approaches) {
          try {
            debugData.steps.push(`Testing ${approach.name}...`);
            const response = await fetch(approach.url);
            const data = await response.json();
            debugData.approaches[approach.name] = data;
            debugData.steps.push(`✅ ${approach.name} successful`);
          } catch (error) {
            debugData.steps.push(`❌ ${approach.name} failed: ${error}`);
            debugData.approaches[approach.name] = { error: error instanceof Error ? error.message : String(error) };
          }
        }
      }
    } catch (error) {
      debugData.steps.push(`❌ Debug failed: ${error}`);
    }

    setDebugInfo(debugData);
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h1>Header Debug Page</h1>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Debug Controls</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Document ID:</label>
                <input
                  type="text"
                  className="form-control"
                  value={documentId}
                  onChange={(e) => setDocumentId(e.target.value)}
                />
              </div>
              
              <button 
                className="btn btn-primary" 
                onClick={runDebug}
                disabled={loading}
              >
                {loading ? 'Running Debug...' : 'Run Debug'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Debug Results</h5>
            </div>
            <div className="card-body">
              {debugInfo ? (
                <div>
                  <h6>Steps:</h6>
                  <ul className="list-unstyled">
                    {debugInfo.steps.map((step: string, index: number) => (
                      <li key={index} className="mb-1">
                        <small>{step}</small>
                      </li>
                    ))}
                  </ul>
                  
                  <h6>Raw Header Data:</h6>
                  <pre style={{ fontSize: '0.7rem', maxHeight: '200px', overflow: 'auto' }}>
                    {JSON.stringify(debugInfo.rawHeaderData, null, 2)}
                  </pre>
                  
                  <h6>Header Data by ID:</h6>
                  <pre style={{ fontSize: '0.7rem', maxHeight: '200px', overflow: 'auto' }}>
                    {JSON.stringify(debugInfo.headerData, null, 2)}
                  </pre>
                  
                  <h6>API Approaches:</h6>
                  {Object.entries(debugInfo.approaches || {}).map(([name, data]) => (
                    <div key={name} className="mb-2">
                      <strong>{name}:</strong>
                      <pre style={{ fontSize: '0.7rem', maxHeight: '150px', overflow: 'auto' }}>
                        {JSON.stringify(data, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Click "Run Debug" to start debugging</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 