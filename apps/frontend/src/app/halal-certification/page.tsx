'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button';

interface HalalCertificate {
  id: string;
  productName: string;
  certificateNumber: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  ipfsHash: string;
  blockchainTx: string;
  status: 'active' | 'expired' | 'pending';
  fileUrl?: string;
}

const mockCertificates: HalalCertificate[] = [
  {
    id: '1',
    productName: 'Organic Halal Chicken',
    certificateNumber: 'HAL-2024-001',
    issuingAuthority: 'Islamic Food Council',
    issueDate: '2024-01-15',
    expiryDate: '2025-01-15',
    ipfsHash: 'QmYwAPJzv5CZsnAztx8Bv8Xc7t5L3YHnF5F5F5F5F5F5F5',
    blockchainTx: '0x1234567890abcdef1234567890abcdef12345678',
    status: 'active',
  },
  {
    id: '2',
    productName: 'Halal Beef Products',
    certificateNumber: 'HAL-2024-002',
    issuingAuthority: 'Halal Certification Authority',
    issueDate: '2024-02-01',
    expiryDate: '2025-02-01',
    ipfsHash: 'QmXAPJzv5CZsnAztx8Bv8Xc7t5L3YHnF5F5F5F5F5F5F5',
    blockchainTx: '0xabcdef1234567890abcdef1234567890abcdef12',
    status: 'active',
  },
];

export default function HalalCertificationPage() {
  const [certificates, setCertificates] = useState<HalalCertificate[]>(mockCertificates);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadToIPFS = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      // Simulate IPFS upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock IPFS hash and blockchain transaction
      const newCertificate: HalalCertificate = {
        id: Date.now().toString(),
        productName: 'New Product',
        certificateNumber: `HAL-2024-${certificates.length + 1}`,
        issuingAuthority: 'HalalChain Authority',
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        ipfsHash: `Qm${Math.random().toString(36).substring(2, 15)}`,
        blockchainTx: `0x${Math.random().toString(16).substring(2, 42)}`,
        status: 'pending',
        fileUrl: URL.createObjectURL(selectedFile),
      };

      setCertificates(prev => [...prev, newCertificate]);
      setSelectedFile(null);
      setShowUploadForm(false);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'expired':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Halal Certification Management</h1>
          <p className="text-gray-600">
            Upload and manage Halal certificates stored securely on IPFS with blockchain verification.
          </p>
        </div>

        <div className="mb-6">
          <Button
            variant="primary"
            onClick={() => setShowUploadForm(!showUploadForm)}
          >
            {showUploadForm ? 'Cancel Upload' : 'Upload New Certificate'}
          </Button>
        </div>

        {showUploadForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Halal Certificate</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate File
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {selectedFile && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Selected file: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </p>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  onClick={uploadToIPFS}
                  disabled={!selectedFile || isUploading}
                >
                  {isUploading ? 'Uploading to IPFS...' : 'Upload to IPFS'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedFile(null);
                    setShowUploadForm(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Certificate Registry</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certificate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Authority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IPFS Hash
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cert.productName}</div>
                      <div className="text-sm text-gray-500">ID: {cert.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{cert.certificateNumber}</div>
                      <div className="text-sm text-gray-500">
                        {cert.issueDate} - {cert.expiryDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cert.issuingAuthority}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(cert.status)}`}>
                        {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {cert.ipfsHash.substring(0, 10)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Verify
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">IPFS & Blockchain Benefits</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Immutable certificate storage on IPFS</li>
            <li>• Blockchain verification for authenticity</li>
            <li>• Decentralized and censorship-resistant</li>
            <li>• Global accessibility and transparency</li>
            <li>• Smart contract integration for automated compliance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
