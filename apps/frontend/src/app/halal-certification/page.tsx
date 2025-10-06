'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Eye, CheckCircle, AlertTriangle, Calendar, FileText, QrCode, Upload, BarChart3 } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCertificate, setSelectedCertificate] = useState<HalalCertificate | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

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

  // Filter and search certificates
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuingAuthority.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'expired':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'expired':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Calendar className="h-4 w-4 text-yellow-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleViewCertificate = (cert: HalalCertificate) => {
    setSelectedCertificate(cert);
    setShowCertificateModal(true);
  };

  const handleVerifyCertificate = async (cert: HalalCertificate) => {
    // Simulate blockchain verification
    alert(`Verifying certificate ${cert.certificateNumber} on blockchain...\nIPFS Hash: ${cert.ipfsHash}\nTransaction: ${cert.blockchainTx}`);
  };

  const handleDownloadCertificate = (cert: HalalCertificate) => {
    // Simulate download
    alert(`Downloading certificate ${cert.certificateNumber}`);
  };

  const getCertificateStats = () => {
    const total = certificates.length;
    const active = certificates.filter(c => c.status === 'active').length;
    const expired = certificates.filter(c => c.status === 'expired').length;
    const pending = certificates.filter(c => c.status === 'pending').length;
    return { total, active, expired, pending };
  };

  const stats = getCertificateStats();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Halal Certification Management</h1>
              <p className="text-muted-foreground">
                Upload and manage Halal certificates stored securely on IPFS with blockchain verification.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>{showAnalytics ? 'Hide' : 'Show'} Analytics</span>
            </Button>
          </div>

          {/* Stats Cards */}
          {showAnalytics && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Certificates</p>
                    <p className="text-2xl font-bold text-card-foreground">{stats.total}</p>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Expired</p>
                    <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <Button
              variant="primary"
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>{showUploadForm ? 'Cancel Upload' : 'Upload New Certificate'}</span>
            </Button>
          </div>
        </div>

        {showUploadForm && (
          <div className="bg-card rounded-lg shadow-md p-6 mb-8 border">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Upload Halal Certificate</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Certificate File
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>

              {selectedFile && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
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

        <div className="bg-card rounded-lg shadow-md overflow-hidden border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-xl font-semibold text-card-foreground">Certificate Registry</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Certificate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Authority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    IPFS Hash
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {filteredCertificates.map((cert) => (
                  <motion.tr
                    key={cert.id}
                    className="hover:bg-muted/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(cert.status)}
                        <div>
                          <div className="text-sm font-medium text-card-foreground">{cert.productName}</div>
                          <div className="text-sm text-muted-foreground">ID: {cert.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-card-foreground font-medium">{cert.certificateNumber}</div>
                      <div className="text-sm text-muted-foreground">
                        {cert.issueDate} - {cert.expiryDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-card-foreground">
                      {cert.issuingAuthority}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(cert.status)}`}>
                        {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground font-mono">
                      <div className="flex items-center space-x-1">
                        <span>{cert.ipfsHash.substring(0, 10)}...</span>
                        <div title="View QR Code">
                          <QrCode className="h-4 w-4 cursor-pointer hover:text-primary" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCertificate(cert)}
                          className="flex items-center space-x-1"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVerifyCertificate(cert)}
                          className="flex items-center space-x-1"
                        >
                          <CheckCircle className="h-3 w-3" />
                          <span>Verify</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadCertificate(cert)}
                          className="flex items-center space-x-1"
                        >
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Certificate Detail Modal */}
        {showCertificateModal && selectedCertificate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-card-foreground">Certificate Details</h2>
                  <button
                    onClick={() => setShowCertificateModal(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground mb-4">Certificate Information</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                          <p className="text-card-foreground">{selectedCertificate.productName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Certificate Number</label>
                          <p className="text-card-foreground font-mono">{selectedCertificate.certificateNumber}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Issuing Authority</label>
                          <p className="text-card-foreground">{selectedCertificate.issuingAuthority}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Status</label>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(selectedCertificate.status)}
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCertificate.status)}`}>
                              {selectedCertificate.status.charAt(0).toUpperCase() + selectedCertificate.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground mb-4">Validity Period</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Issue Date</label>
                          <p className="text-card-foreground">{selectedCertificate.issueDate}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                          <p className="text-card-foreground">{selectedCertificate.expiryDate}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Days Remaining</label>
                          <p className="text-card-foreground">
                            {Math.max(0, Math.ceil((new Date(selectedCertificate.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-4">Blockchain Information</h3>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">IPFS Hash</label>
                        <p className="text-card-foreground font-mono text-sm break-all">{selectedCertificate.ipfsHash}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Blockchain Transaction</label>
                        <p className="text-card-foreground font-mono text-sm break-all">{selectedCertificate.blockchainTx}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => handleDownloadCertificate(selectedCertificate)}
                      className="flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleVerifyCertificate(selectedCertificate)}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Verify on Blockchain</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        <div className="mt-8 bg-muted/50 rounded-lg p-6 border">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">IPFS & Blockchain Benefits</h3>
          <ul className="text-muted-foreground text-sm space-y-1">
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
