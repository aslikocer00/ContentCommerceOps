import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContentItem, DateRange } from './models';

export interface TableState {
  page: number;
  pageSize: number;
  sort: string;
  filters: Record<string, string | boolean>;
}

const today = new Date();
const from7 = new Date();
from7.setDate(today.getDate() - 7);

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private dateRangeSubject = new BehaviorSubject<DateRange>({
    label: 'Last 7 days',
    from: from7.toISOString(),
    to: today.toISOString(),
  });
  readonly dateRange$ = this.dateRangeSubject.asObservable();

  private contentTableSubject = new BehaviorSubject<TableState>({
    page: 1,
    pageSize: 8,
    sort: 'publishDate:desc',
    filters: { category: 'fashion', status: 'scheduled' },
  });
  readonly contentTableState$ = this.contentTableSubject.asObservable();

  private voucherTableSubject = new BehaviorSubject<TableState>({
    page: 1,
    pageSize: 6,
    sort: 'expiryDate:asc',
    filters: { active: true },
  });
  readonly voucherTableState$ = this.voucherTableSubject.asObservable();

  private selectedContentSubject = new BehaviorSubject<ContentItem | null>(null);
  readonly selectedContent$ = this.selectedContentSubject.asObservable();

  setDateRange(range: DateRange): void {
    this.dateRangeSubject.next(range);
  }

  updateContentTableState(state: Partial<TableState>): void {
    this.contentTableSubject.next({ ...this.contentTableSubject.value, ...state });
  }

  updateVoucherTableState(state: Partial<TableState>): void {
    this.voucherTableSubject.next({ ...this.voucherTableSubject.value, ...state });
  }

  selectContent(item: ContentItem | null): void {
    this.selectedContentSubject.next(item);
  }
}
