import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private messagesSubject = new BehaviorSubject<ToastMessage[]>([]);
  readonly messages$ = this.messagesSubject.asObservable();

  push(type: ToastMessage['type'], text: string): void {
    const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Date.now().toString();
    const message = { id, type, text };
    this.messagesSubject.next([...this.messagesSubject.value, message]);
    setTimeout(() => this.dismiss(message.id), 4000);
  }

  dismiss(id: string): void {
    this.messagesSubject.next(this.messagesSubject.value.filter((item) => item.id !== id));
  }
}
