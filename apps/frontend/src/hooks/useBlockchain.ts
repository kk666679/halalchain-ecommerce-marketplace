import { useState, useCallback } from 'react';
import { blockchainApi } from '@/lib/api';

export interface HalalCertification {
  id: string;
  productId: string;
  blockchainTx: string;
  halalScore: number;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  issuedBy: string;
  issuedAt: string;
}

export function useBlockchain() {
  const [loading, setLoading] = useState(false);
  const [certifications, setCertifications] = useState<HalalCertification[]>([]);

  const getHalalStatus = useCallback(async (productId: string) => {
    try {
      setLoading(true);
      const status = await blockchainApi.getHalalStatus(productId);
      return status;
    } catch (error) {
      console.error('Failed to get halal status:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCertifications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await blockchainApi.getCertifications() as HalalCertification[];
      setCertifications(data);
      return data;
    } catch (error) {
      console.error('Failed to get certifications:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    certifications,
    getHalalStatus,
    getCertifications,
  };
}