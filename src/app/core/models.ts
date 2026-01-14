export type Role = 'Admin' | 'Editor' | 'Commerce';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface DateRange {
  label: string;
  from: string;
  to: string;
}

export interface Kpi {
  label: string;
  value: string | number;
  delta?: string;
}

export interface ActivityItem {
  id: string;
  message: string;
  time: string;
  type: 'content' | 'voucher' | 'newsletter' | 'system';
}

export interface ContentSection {
  heading: string;
  body: string;
}

export interface CommerceLink {
  label: string;
  retailer: string;
  price: string;
  url: string;
}

export interface ContentPerformance {
  views: number;
  avgReadTime: string;
  clickThrough: string;
  revenue: string;
}

export interface ContentItem {
  id: string;
  title: string;
  category: 'fashion' | 'beauty' | 'lifestyle';
  status: 'draft' | 'scheduled' | 'published';
  author: string;
  publishDate: string;
  summary: string;
  tags: string[];
  heroGradient?: string;
  readTime?: string;
  sectionHighlights?: ContentSection[];
  commerceLinks?: CommerceLink[];
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  performance?: ContentPerformance;
  channels?: string[];
  editorNotes?: string;
}

export interface Newsletter {
  id: string;
  subject: string;
  status: 'scheduled' | 'sent';
  sendDate: string;
  heroContentId?: string;
  blocks: { title: string; contentId: string }[];
}

export interface Voucher {
  id: string;
  merchant: string;
  code: string;
  active: boolean;
  expiryDate: string;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface AnalyticsPoint {
  date: string;
  value: number;
}

export interface AnalyticsResponse {
  traffic: AnalyticsPoint[];
  newsletter: AnalyticsPoint[];
  vouchers: AnalyticsPoint[];
  breakdown: { label: string; value: number }[];
}

export interface ApiError {
  message: string;
  status: number;
}
