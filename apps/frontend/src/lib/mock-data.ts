import {
  KeywordData,
  BacklinkData,
  SiteAuditData,
  ContentItem,
  MediaItem,
  Contact,
  Deal,
  Interaction,
} from '@/types';

// SEO Mock Data
export const mockKeywords: KeywordData[] = [
  {
    id: '1',
    keyword: 'halal certification',
    position: 3,
    volume: 1200,
    difficulty: 45,
    trend: [2, 3, 4, 3, 2, 3],
  },
  {
    id: '2',
    keyword: 'islamic finance',
    position: 7,
    volume: 890,
    difficulty: 52,
    trend: [8, 7, 6, 7, 8, 7],
  },
  {
    id: '3',
    keyword: 'halal products',
    position: 1,
    volume: 2400,
    difficulty: 38,
    trend: [1, 1, 1, 1, 1, 1],
  },
];

export const mockBacklinks: BacklinkData[] = [
  {
    id: '1',
    domain: 'islamicfinance.com',
    url: 'https://islamicfinance.com/halal-certification',
    anchor: 'halal certification guide',
    da: 65,
    status: 'active',
  },
  {
    id: '2',
    domain: 'halalnews.org',
    url: 'https://halalnews.org/certification-process',
    anchor: 'certification process',
    da: 42,
    status: 'active',
  },
  {
    id: '3',
    domain: 'muslimbusiness.net',
    url: 'https://muslimbusiness.net/halal-standards',
    anchor: 'halal standards',
    da: 38,
    status: 'broken',
  },
];

export const mockSiteAudits: SiteAuditData[] = [
  {
    id: '1',
    url: 'https://halalchain.com',
    score: 85,
    issues: [
      { type: 'error', message: 'Missing meta descriptions', count: 3 },
      { type: 'warning', message: 'Slow loading images', count: 5 },
      { type: 'info', message: 'Mobile-friendly', count: 1 },
    ],
  },
  {
    id: '2',
    url: 'https://halalchain.com/blog',
    score: 92,
    issues: [
      { type: 'warning', message: 'Unused CSS', count: 2 },
      { type: 'info', message: 'Good internal linking', count: 1 },
    ],
  },
];

// CMS Mock Data
export const mockContentItems: ContentItem[] = [
  {
    id: '1',
    title: 'Understanding Halal Certification Process',
    status: 'published',
    author: 'Ahmed Hassan',
    publishDate: '2024-01-15',
    category: 'Education',
  },
  {
    id: '2',
    title: 'Top Halal Products of 2024',
    status: 'draft',
    author: 'Sarah Johnson',
    publishDate: '2024-01-20',
    category: 'Market Trends',
  },
  {
    id: '3',
    title: 'Islamic Finance Principles',
    status: 'scheduled',
    author: 'Mohammed Ali',
    publishDate: '2024-01-25',
    category: 'Finance',
  },
];

export const mockMediaItems: MediaItem[] = [
  {
    id: '1',
    name: 'halal-certification-badge.png',
    type: 'image',
    size: 245760,
    url: '/images/halal-certification-badge.png',
    uploadedAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'islamic-finance-video.mp4',
    type: 'video',
    size: 5242880,
    url: '/videos/islamic-finance-video.mp4',
    uploadedAt: '2024-01-12',
  },
  {
    id: '3',
    name: 'halal-standards-guide.pdf',
    type: 'document',
    size: 1024000,
    url: '/docs/halal-standards-guide.pdf',
    uploadedAt: '2024-01-14',
  },
];

// CRM Mock Data
export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    company: 'Global Foods Inc',
    status: 'customer',
    lastContact: '2024-01-18',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@retail.com',
    company: 'Halal Retail Chain',
    status: 'prospect',
    lastContact: '2024-01-16',
  },
  {
    id: '3',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@startup.com',
    company: 'Islamic Tech Startup',
    status: 'lead',
    lastContact: '2024-01-14',
  },
];

export const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Halal Certification Package',
    value: 5000,
    stage: 'negotiation',
    contactId: '1',
    expectedClose: '2024-02-01',
  },
  {
    id: '2',
    title: 'Islamic Finance Consultation',
    value: 8000,
    stage: 'proposal',
    contactId: '2',
    expectedClose: '2024-02-15',
  },
  {
    id: '3',
    title: 'Halal Supply Chain Audit',
    value: 12000,
    stage: 'qualification',
    contactId: '3',
    expectedClose: '2024-03-01',
  },
];

export const mockInteractions: Interaction[] = [
  {
    id: '1',
    contactId: '1',
    type: 'email',
    date: '2024-01-18',
    notes: 'Discussed certification requirements and pricing',
  },
  {
    id: '2',
    contactId: '2',
    type: 'call',
    date: '2024-01-16',
    notes: 'Scheduled demo for next week',
  },
  {
    id: '3',
    contactId: '3',
    type: 'meeting',
    date: '2024-01-14',
    notes: 'Initial consultation about halal compliance',
  },
];
