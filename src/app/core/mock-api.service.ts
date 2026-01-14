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
      { label: 'Articles Published (7d)', value: 58, delta: '+12%' },
      { label: 'Newsletter Opens (avg)', value: '52.4%', delta: '+4.1%' },
      { label: 'Affiliate Clicks', value: 17420, delta: '+9.6%' },
      { label: 'Voucher Conversions', value: '4.3%', delta: '+0.8%' },
      { label: 'Top Category', value: 'Fashion' },
    ];

    const activity = [
      { id: 'a1', message: 'New article scheduled: Autumn Capsule Edit', time: '12 min ago', type: 'content' },
      { id: 'a2', message: 'Newsletter sent: Monday Market Edit', time: '45 min ago', type: 'newsletter' },
      { id: 'a3', message: 'Voucher updated: Charlotte Tilbury 15% Off', time: '2 hours ago', type: 'voucher' },
      { id: 'a4', message: 'New affiliate link approved: The Outnet', time: '4 hours ago', type: 'voucher' },
      { id: 'a5', message: 'Editorial calendar updated by Mia', time: 'Yesterday', type: 'system' },
      { id: 'a6', message: 'New draft created: Winter Skin Reset', time: 'Yesterday', type: 'content' },
      { id: 'a7', message: 'Newsletter scheduled: Sunday Catch-Up', time: '2 days ago', type: 'newsletter' },
      { id: 'a8', message: 'Voucher expired: Selfridges Beauty', time: '2 days ago', type: 'voucher' },
      { id: 'a9', message: 'Analytics export requested', time: '3 days ago', type: 'system' },
      { id: 'a10', message: 'New category added: Travel', time: '4 days ago', type: 'system' },
      { id: 'a11', message: 'Content published: Luxe Loungewear Guide', time: '5 days ago', type: 'content' },
      { id: 'a12', message: 'Voucher created: NET-A-PORTER 20%', time: '6 days ago', type: 'voucher' },
    ];

    const categories = ['fashion', 'beauty', 'lifestyle'] as const;
    const statuses = ['draft', 'scheduled', 'published'] as const;
    const authors = ['Mia Clarke', 'Sophie Brown', 'Harriet Lane', 'Ella Winters', 'Grace Patel'];
    const summaries = [
      'A premium edit of new-season trends and wardrobe heroes.',
      'Editors share the best beauty launches and treatments.',
      'A curated guide to travel, wellness, and lifestyle upgrades.',
      'Shopping picks backed by high-performing affiliate data.',
      'Trend report with styling notes and shoppable highlights.',
    ];

    const content = Array.from({ length: 60 }).map((_, index) => ({
      id: `${index + 1}`,
      title: `Feature Story ${index + 1}`,
      category: categories[index % categories.length],
      status: statuses[index % statuses.length],
      author: authors[index % authors.length],
      publishDate: new Date(Date.now() + index * 43200000).toISOString(),
      summary: summaries[index % summaries.length],
      tags: ['editorial', 'trending', index % 2 === 0 ? 'commerce' : 'style'],
    }));

    const newsletters = Array.from({ length: 20 }).map((_, index) => ({
      id: `${index + 1}`,
      subject: `Daily Luxe Digest #${index + 1}`,
      status: index % 3 === 0 ? 'sent' : 'scheduled',
      sendDate: new Date(Date.now() + index * 86400000).toISOString(),
      heroContentId: `${(index % 12) + 1}`,
      blocks: [
        { title: 'Top Stories', contentId: `${(index % 12) + 1}` },
        { title: 'Beauty Radar', contentId: `${(index % 12) + 2}` },
        { title: 'Shopping Edit', contentId: `${(index % 12) + 3}` },
      ],
    }));

    const merchants = [
      'Net-a-Porter',
      'Selfridges',
      'Space NK',
      'Matches',
      'Liberty',
      'The Outnet',
      'John Lewis',
      'Arket',
      'COS',
    ];

    const vouchers = Array.from({ length: 30 }).map((_, index) => ({
      id: `${index + 1}`,
      merchant: merchants[index % merchants.length],
      code: `SLX${index + 100}`,
      active: index % 3 !== 0,
      expiryDate: new Date(Date.now() + (index + 10) * 86400000).toISOString(),
      clicks: 1200 + index * 140,
      conversions: 80 + index * 7,
      revenue: 4200 + index * 420,
    }));

    const analytics = {
      traffic: Array.from({ length: 30 }).map((_, index) => ({
        date: new Date(Date.now() - index * 86400000).toISOString(),
        value: 14000 - index * 220,
      })),
      newsletter: Array.from({ length: 30 }).map((_, index) => ({
        date: new Date(Date.now() - index * 86400000).toISOString(),
        value: 42 + index * 0.8,
      })),
      vouchers: Array.from({ length: 30 }).map((_, index) => ({
        date: new Date(Date.now() - index * 86400000).toISOString(),
        value: 3.1 + index * 0.05,
      })),
      breakdown: [
        { label: 'Fashion', value: 46 },
        { label: 'Beauty', value: 31 },
        { label: 'Lifestyle', value: 23 },
      ],
    };

    const auth: unknown[] = [];
    const me: unknown[] = [];

    return { users, kpis, activity, content, newsletters, vouchers, analytics, auth, me };
  }

  post(reqInfo: RequestInfo): Observable<unknown> | undefined {
    if (reqInfo.collectionName === 'auth' && reqInfo.id === 'login') {
      const { email } = reqInfo.utils.getJsonBody(reqInfo.req) as { email: string };
      const db = reqInfo.utils.getDb() as { users: User[] };
      const user = db.users.find((u) => u.email === email) ?? db.users[0];
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
      const db = reqInfo.utils.getDb() as { users: User[] };
      const user = db.users[0];
      return reqInfo.utils.createResponse$(() => ({ body: user, status: 200 }));
    }

    if (reqInfo.collectionName === 'content' && !reqInfo.id) {
      const db = reqInfo.utils.getDb() as { content: Array<Record<string, unknown>> };
      const query = reqInfo.query;
      const category = query.get('category')?.[0];
      const status = query.get('status')?.[0];
      const text = (query.get('query')?.[0] ?? '').toLowerCase();

      const filtered = db.content.filter((item) => {
        const matchCategory = category ? item['category'] === category : true;
        const matchStatus = status ? item['status'] === status : true;
        const matchText = text
          ? `${item['title'] ?? ''} ${item['summary'] ?? ''}`.toLowerCase().includes(text)
          : true;
        return matchCategory && matchStatus && matchText;
      });

      return reqInfo.utils.createResponse$(() => ({ body: filtered, status: 200 }));
    }

    if (reqInfo.collectionName === 'newsletters' && !reqInfo.id) {
      const db = reqInfo.utils.getDb() as { newsletters: Array<Record<string, unknown>> };
      const status = reqInfo.query.get('status')?.[0];
      const filtered = status
        ? db.newsletters.filter((item) => item['status'] === status)
        : db.newsletters;
      return reqInfo.utils.createResponse$(() => ({ body: filtered, status: 200 }));
    }

    if (reqInfo.collectionName === 'vouchers' && !reqInfo.id) {
      const db = reqInfo.utils.getDb() as { vouchers: Array<Record<string, unknown>> };
      const merchant = (reqInfo.query.get('merchant')?.[0] ?? '').toLowerCase();
      const active = reqInfo.query.get('active')?.[0];
      const filtered = db.vouchers.filter((item) => {
        const matchMerchant = merchant
          ? `${item['merchant'] ?? ''}`.toLowerCase().includes(merchant)
          : true;
        const matchActive = active ? `${item['active']}` === active : true;
        return matchMerchant && matchActive;
      });
      return reqInfo.utils.createResponse$(() => ({ body: filtered, status: 200 }));
    }

    return undefined;
  }
}
