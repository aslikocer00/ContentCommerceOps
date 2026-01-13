import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ActivityItem,
  AnalyticsResponse,
  ContentItem,
  Kpi,
  Newsletter,
  Voucher,
} from './models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getKpis(from: string, to: string): Observable<Kpi[]> {
    const params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<Kpi[]>(`${this.baseUrl}/kpis`, { params });
  }

  getActivity(from: string, to: string): Observable<ActivityItem[]> {
    const params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<ActivityItem[]>(`${this.baseUrl}/activity`, { params });
  }

  getContent(query: Record<string, string | number | boolean>): Observable<ContentItem[]> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      params = params.set(key, value.toString());
    });
    return this.http.get<ContentItem[]>(`${this.baseUrl}/content`, { params });
  }

  getContentById(id: string): Observable<ContentItem> {
    return this.http.get<ContentItem>(`${this.baseUrl}/content/${id}`);
  }

  createContent(payload: Partial<ContentItem>): Observable<ContentItem> {
    return this.http.post<ContentItem>(`${this.baseUrl}/content`, payload);
  }

  updateContent(id: string, payload: Partial<ContentItem>): Observable<ContentItem> {
    return this.http.put<ContentItem>(`${this.baseUrl}/content/${id}`, payload);
  }

  getNewsletters(query: Record<string, string | number>): Observable<Newsletter[]> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      params = params.set(key, value.toString());
    });
    return this.http.get<Newsletter[]>(`${this.baseUrl}/newsletters`, { params });
  }

  getNewsletterById(id: string): Observable<Newsletter> {
    return this.http.get<Newsletter>(`${this.baseUrl}/newsletters/${id}`);
  }

  createNewsletter(payload: Partial<Newsletter>): Observable<Newsletter> {
    return this.http.post<Newsletter>(`${this.baseUrl}/newsletters`, payload);
  }

  getVouchers(query: Record<string, string | number | boolean>): Observable<Voucher[]> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      params = params.set(key, value.toString());
    });
    return this.http.get<Voucher[]>(`${this.baseUrl}/vouchers`, { params });
  }

  createVoucher(payload: Partial<Voucher>): Observable<Voucher> {
    return this.http.post<Voucher>(`${this.baseUrl}/vouchers`, payload);
  }

  updateVoucher(id: string, payload: Partial<Voucher>): Observable<Voucher> {
    return this.http.put<Voucher>(`${this.baseUrl}/vouchers/${id}`, payload);
  }

  getAnalytics(from: string, to: string): Observable<AnalyticsResponse> {
    const params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<AnalyticsResponse>(`${this.baseUrl}/analytics`, { params });
  }
}
