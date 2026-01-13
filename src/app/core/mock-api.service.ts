import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { User } from './models';
import { Observable } from 'rxjs';

export class MockApiService implements InMemoryDbService {
  createDb() {
    const users: User[] = [
      { id: '1', name: 'Ava Thornton', email: 'admin@sheerluxe.com', role: 'Admin' },
      { id: '2', name: 'Mia Clarke', email: 'editor@sheerluxe.com', role: 'Editor' },
      { id: '3', name: 'Noah Wells', email: 'commerce@sheerluxe.com', role: 'Commerce' },
    ];

    const kpis = [
      { label: 'Articles Published (7d)', value: 42, delta: '+8%' },
      { label: 'Newsletter Opens (avg)', value: '48.6%', delta: '+2.4%' },
      { label: 'Affiliate Clicks', value: 12840, delta: '+5.1%' },
      { label: 'Voucher Conversions', value: '3.9%', delta: '+0.6%' },
      { label: 'Top Category', value: 'Fashion' },
    ];

    const activity = [
      { id: 'a1', message: 'New article scheduled: Autumn Capsule Edit', time: '2 hours ago', type: 'content' },
      { id: 'a2', message: 'Voucher updated: Charlotte Tilbury 15% Off', time: '5 hours ago', type: 'voucher' },
      { id: 'a3', message: 'Newsletter sent: Monday Roundup', time: 'Yesterday', type: 'newsletter' },
      { id: 'a4', message: 'Editorial calendar updated by Mia', time: '2 days ago', type: 'system' },
    ];

    const content = Array.from({ length: 18 }).map((_, index) => ({
      id: `${index + 1}`,
      title: `Feature Story ${index + 1}`,
      category: (['fashion', 'beauty', 'lifestyle'] as const)[index % 3],
      status: (['draft', 'scheduled', 'published'] as const)[index % 3],
      author: ['Mia Clarke', 'Sophie Brown', 'Harriet Lane'][index % 3],
      publishDate: new Date(Date.now() + index * 86400000).toISOString(),
      summary: 'A premium edit of the latest trends and product recommendations.',
      tags: ['editorial', 'trending', 'seasonal'],
    }));

    const newsletters = Array.from({ length: 8 }).map((_, index) => ({
      id: `${index + 1}`,
      subject: `Daily Luxe Digest #${index + 1}`,
      status: index % 2 === 0 ? 'scheduled' : 'sent',
      sendDate: new Date(Date.now() + index * 86400000).toISOString(),
      heroContentId: `${(index % 6) + 1}`,
      blocks: [
        { title: 'Top Stories', contentId: `${(index % 6) + 1}` },
        { title: 'Beauty Radar', contentId: `${(index % 6) + 2}` },
      ],
    }));

    const vouchers = Array.from({ length: 12 }).map((_, index) => ({
      id: `${index + 1}`,
      merchant: ['Net-a-Porter', 'Selfridges', 'Space NK', 'Matches', 'Liberty'][index % 5],
      code: `SLX${index + 10}`,
      active: index % 2 === 0,
      expiryDate: new Date(Date.now() + (index + 5) * 86400000).toISOString(),
      clicks: 1800 + index * 120,
      conversions: 120 + index * 6,
      revenue: 5200 + index * 350,
    }));

    const analytics = {
      traffic: Array.from({ length: 12 }).map((_, index) => ({
        date: new Date(Date.now() - index * 86400000).toISOString(),
        value: 12000 - index * 300,
      })),
      newsletter: Array.from({ length: 12 }).map((_, index) => ({
        date: new Date(Date.now() - index * 86400000).toISOString(),
        value: 45 + index * 1.4,
      })),
      vouchers: Array.from({ length: 12 }).map((_, index) => ({
        date: new Date(Date.now() - index * 86400000).toISOString(),
        value: 3.2 + index * 0.1,
      })),
      breakdown: [
        { label: 'Fashion', value: 48 },
        { label: 'Beauty', value: 32 },
        { label: 'Lifestyle', value: 20 },
      ],
    };

    const auth: unknown[] = [];
    const me: unknown[] = [];

    return { users, kpis, activity, content, newsletters, vouchers, analytics, auth, me };
  }

  post(reqInfo: RequestInfo): Observable<unknown> | undefined {
    if (reqInfo.collectionName === 'auth' && reqInfo.id === 'login') {
      const { email } = reqInfo.utils.getJsonBody(reqInfo.req) as { email: string };
      const user = (reqInfo.utils.getDb().users as User[]).find((u) => u.email === email) ??
        (reqInfo.utils.getDb().users as User[])[0];
      const response = {
        token: 'fake-jwt-token',
        user,
      };
      return reqInfo.utils.createResponse$(() => ({
        body: response,
        status: 200,
      }));
    }

    return undefined;
  }

  get(reqInfo: RequestInfo): Observable<unknown> | undefined {
    if (reqInfo.collectionName === 'me') {
      const user = (reqInfo.utils.getDb().users as User[])[0];
      return reqInfo.utils.createResponse$(() => ({ body: user, status: 200 }));
    }

    return undefined;
  }
}
