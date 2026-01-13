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

export interface ContentItem {
  id: string;
  title: string;
  category: 'fashion' | 'beauty' | 'lifestyle';
  status: 'draft' | 'scheduled' | 'published';
  author: string;
  publishDate: string;
  summary: string;
  tags: string[];
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
