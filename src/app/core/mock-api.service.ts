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

    const featuredContent = [
      {
        title: '20 Stylish Faux Fur Pieces Under £150',
        category: 'fashion' as const,
        summary:
          'A tight edit of cosy outerwear with a luxe feel. Focused on texture, modern cuts and wearable neutrals.',
        readTime: '5 min',
        sections: [
          {
            heading: 'Hero Pieces',
            body: 'Statement collars, belted silhouettes and cropped jackets deliver maximum impact without the designer price tag.',
          },
          {
            heading: 'Styling Notes',
            body: 'Balance the volume with clean denim or sleek tailoring. Tone-on-tone palettes keep it elevated.',
          },
        ],
        commerceLinks: [
          { label: 'Cropped Teddy Jacket', retailer: 'Arket', price: '£149', url: '#' },
          { label: 'Longline Faux Fur Coat', retailer: 'COS', price: '£135', url: '#' },
          { label: 'Textured Collar Jacket', retailer: 'Zara', price: '£89', url: '#' },
        ],
      },
      {
        title: 'Industry Insiders Reveal The Clever Ways To Edit & Refresh Your Wardrobe',
        category: 'fashion' as const,
        summary:
          'Stylists and buyers share how to rework existing staples with smarter layering and accessories.',
        readTime: '6 min',
        sections: [
          {
            heading: 'Quick Wins',
            body: 'Swap knitwear for a structured blazer, and build contrast with polished accessories.',
          },
          {
            heading: 'Investment Moves',
            body: 'Focus on elevated basics: premium denim, a versatile trench, and a standout bag.',
          },
        ],
        commerceLinks: [
          { label: 'Modern Trench', retailer: 'Massimo Dutti', price: '£199', url: '#' },
          { label: 'Tailored Blazer', retailer: 'Reiss', price: '£240', url: '#' },
          { label: 'Leather Shoulder Bag', retailer: 'Whistles', price: '£189', url: '#' },
        ],
      },
      {
        title: '5 Chic Underwear Brands To Know',
        category: 'fashion' as const,
        summary:
          'The labels delivering beautiful, wearable lingerie with better fit, comfort and fabric quality.',
        readTime: '4 min',
        sections: [
          {
            heading: 'The Edit',
            body: 'From smooth second-skin basics to delicate lace, these brands cover everyday and occasion.',
          },
          {
            heading: 'Fit Focus',
            body: 'Look for wider straps, soft elastics and breathable fabrics to keep things effortless.',
          },
        ],
        commerceLinks: [
          { label: 'Seamless Bralette', retailer: 'Skims', price: '£42', url: '#' },
          { label: 'Lace Longline Bra', retailer: 'Agent Provocateur', price: '£110', url: '#' },
        ],
      },
      {
        title: '18 AllSaints Pieces You’ll Want To Shop This Season',
        category: 'fashion' as const,
        summary:
          'A polished high-street haul spanning leather, knitwear and tailored separates.',
        readTime: '5 min',
        sections: [
          {
            heading: 'Leather Edit',
            body: 'The brand’s signature jackets anchor the edit with sharp cuts and muted tones.',
          },
          {
            heading: 'Tailored Staples',
            body: 'Matching co-ords and cropped trousers keep the look clean and modern.',
          },
        ],
        commerceLinks: [
          { label: 'Leather Biker Jacket', retailer: 'AllSaints', price: '£359', url: '#' },
          { label: 'Relaxed Knit', retailer: 'AllSaints', price: '£99', url: '#' },
        ],
      },
      {
        title: '7 Skincare Brands Everyone Will Be Talking About This Year',
        category: 'beauty' as const,
        summary:
          'From barrier-first formulas to next-gen actives, these names are setting the tone in skincare.',
        readTime: '6 min',
        sections: [
          {
            heading: 'The Standouts',
            body: 'Expect biotech ingredients, probiotic blends and no-fuss routines that still deliver results.',
          },
          {
            heading: 'What To Try',
            body: 'Start with gentle cleansers, hydrating serums and SPF that works under makeup.',
          },
        ],
        commerceLinks: [
          { label: 'Barrier Repair Serum', retailer: 'Space NK', price: '£58', url: '#' },
          { label: 'Cloud Cream Moisturiser', retailer: 'Cult Beauty', price: '£46', url: '#' },
        ],
      },
      {
        title: 'The Blushers The SheerLuxe Team Swear By',
        category: 'beauty' as const,
        summary:
          'Creams, stains and powders that deliver the perfect flush for every skin tone.',
        readTime: '4 min',
        sections: [
          {
            heading: 'Cream First',
            body: 'Blend on the apples of the cheeks, then sweep a powder to set and add dimension.',
          },
          {
            heading: 'Shade Guide',
            body: 'Rosy mauves flatter most tones, while peach adds warmth and lift.',
          },
        ],
        commerceLinks: [
          { label: 'Cream Blush Stick', retailer: 'Charlotte Tilbury', price: '£34', url: '#' },
          { label: 'Powder Blush', retailer: 'Dior', price: '£41', url: '#' },
        ],
      },
      {
        title: 'The Beauty Treatment That Will Make Your Look Fresh & Rested',
        category: 'beauty' as const,
        summary:
          'A deep dive into a clinic favourite for smoothing and brightening without downtime.',
        readTime: '5 min',
        sections: [
          {
            heading: 'How It Works',
            body: 'A targeted protocol that supports collagen while lifting dullness and fatigue.',
          },
          {
            heading: 'Best For',
            body: 'Perfect pre-event or when skin needs a reset after travel.',
          },
        ],
        commerceLinks: [
          { label: 'Clinic Consultation', retailer: 'The Treatment Rooms', price: '£150', url: '#' },
        ],
      },
      {
        title: '12 K-Beauty Buys We Really Rate',
        category: 'beauty' as const,
        summary:
          'Hydrators, essences and SPF that genuinely perform and layer beautifully.',
        readTime: '6 min',
        sections: [
          {
            heading: 'Skin Prep',
            body: 'Lightweight toners and essences give skin that glassy, hydrated finish.',
          },
          {
            heading: 'SPF Essentials',
            body: 'Look for invisible formulas that sit well under makeup.',
          },
        ],
        commerceLinks: [
          { label: 'Hydrating Essence', retailer: 'YesStyle', price: '£24', url: '#' },
          { label: 'Daily SPF 50', retailer: 'Stylevana', price: '£18', url: '#' },
        ],
      },
      {
        title: 'The New Weight Loss Tools Experts Swear By',
        category: 'lifestyle' as const,
        summary:
          'A balanced view of new tech, supplements and habit trackers that support sustainable change.',
        readTime: '7 min',
        sections: [
          {
            heading: 'Digital Support',
            body: 'Smart coaching platforms and wearables help build long-term consistency.',
          },
          {
            heading: 'Reality Check',
            body: 'Experts stress that nutrition and sleep remain the most important factors.',
          },
        ],
        commerceLinks: [
          { label: 'Smart Scale', retailer: 'Amazon', price: '£79', url: '#' },
          { label: 'Meal Planner App', retailer: 'App Store', price: '£9.99/mo', url: '#' },
        ],
      },
      {
        title: '9 New No- & Low-Alcoholic Drinks To Try This Month',
        category: 'lifestyle' as const,
        summary:
          'A curated mix of aperitifs, sparkling blends and botanical spritzes.',
        readTime: '4 min',
        sections: [
          {
            heading: 'Hosting Picks',
            body: 'Serve chilled with citrus and herbs for a restaurant feel at home.',
          },
          {
            heading: 'What We Loved',
            body: 'Complex flavours that still feel celebratory with zero compromise.',
          },
        ],
        commerceLinks: [
          { label: 'Botanical Spritz', retailer: 'The Whisky Exchange', price: '£28', url: '#' },
        ],
      },
      {
        title: 'How 5 Women In Wellness Train For Long-Term Health',
        category: 'lifestyle' as const,
        summary:
          'A look at strength, mobility and recovery routines that prioritise longevity.',
        readTime: '6 min',
        sections: [
          {
            heading: 'Training Mix',
            body: 'The common thread is consistent strength work, complemented by low-impact cardio.',
          },
          {
            heading: 'Recovery',
            body: 'Sleep, hydration and mobility sessions matter just as much as training days.',
          },
        ],
        commerceLinks: [
          { label: 'Resistance Bands Set', retailer: 'Nike', price: '£32', url: '#' },
        ],
      },
      {
        title: 'The Travel Tech To Invest In Ahead Of Your Next Trip',
        category: 'lifestyle' as const,
        summary:
          'From smart luggage to noise-cancelling essentials, these gadgets make travel seamless.',
        readTime: '5 min',
        sections: [
          {
            heading: 'Carry-On Upgrades',
            body: 'Prioritise lightweight hard-shells and built-in chargers for convenience.',
          },
          {
            heading: 'Comfort Essentials',
            body: 'Good headphones and packing organisers are still the MVPs.',
          },
        ],
        commerceLinks: [
          { label: 'Smart Cabin Case', retailer: 'Away', price: '£265', url: '#' },
          { label: 'Noise Cancelling Headphones', retailer: 'Bose', price: '£299', url: '#' },
        ],
      },
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

    const heroGradients = [
      'linear-gradient(135deg, #1f6feb, #6aa3ff)',
      'linear-gradient(135deg, #1f8b5c, #60d9a8)',
      'linear-gradient(135deg, #c38b5f, #f5cba7)',
      'linear-gradient(135deg, #a65fc3, #e2b6ff)',
    ];

    const content = Array.from({ length: 60 }).map((_, index) => {
      const base = featuredContent[index];
      const category = base?.category ?? categories[index % categories.length];
      const title = base?.title ?? `Feature Story ${index + 1}`;
      const summary = base?.summary ?? summaries[index % summaries.length];
      const readTime = base?.readTime ?? `${4 + (index % 4)} min`;
      const sections = base?.sections ?? [
        {
          heading: 'Overview',
          body: 'A concise breakdown of the story angle, key takeaways and intended audience.',
        },
        {
          heading: 'Editor Notes',
          body: 'Highlight priority commerce links, hero imagery requirements and publishing cadence.',
        },
      ];
      const commerceLinks = base?.commerceLinks ?? [
        { label: 'Hero Product', retailer: 'Selfridges', price: '£120', url: '#' },
        { label: 'Secondary Pick', retailer: 'Net-a-Porter', price: '£95', url: '#' },
      ];

      return {
        id: `${index + 1}`,
        title,
        category,
        status: statuses[index % statuses.length],
        author: authors[index % authors.length],
        publishDate: new Date(Date.now() + index * 43200000).toISOString(),
        summary,
        tags: ['editorial', 'trending', index % 2 === 0 ? 'commerce' : 'style'],
        heroGradient: heroGradients[index % heroGradients.length],
        readTime,
        sectionHighlights: sections,
        commerceLinks,
        seo: {
          title: `${title} | SheerLuxe`,
          description: summary,
          keywords: ['SheerLuxe', category, 'editorial', 'shopping'],
        },
        performance: {
          views: 4200 + index * 210,
          avgReadTime: `${3 + (index % 4)}:${10 + (index % 4)} min`,
          clickThrough: `${3 + (index % 4)}.${index % 9}%`,
          revenue: `£${(3800 + index * 120).toLocaleString()}`,
        },
        channels: ['Homepage', 'Newsletter', 'Social', 'Apple News'].slice(0, 2 + (index % 3)),
        editorNotes:
          'Keep tone elevated and focus on practical takeaways. Ensure commerce links are live 24h before publish.',
      };
    });

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
    const db = reqInfo.utils.getDb() as {
      users: User[];
      content: Array<Record<string, unknown>>;
      newsletters: Array<Record<string, unknown>>;
      vouchers: Array<Record<string, unknown>>;
      kpis: Array<Record<string, unknown>>;
      activity: Array<Record<string, unknown>>;
      analytics: Record<string, unknown>;
    };

    if (reqInfo.collectionName === 'me') {
      const user = db.users[0];
      return reqInfo.utils.createResponse$(() => ({ body: user, status: 200 }));
    }

    if (reqInfo.collectionName === 'kpis') {
      return reqInfo.utils.createResponse$(() => ({ body: db.kpis, status: 200 }));
    }

    if (reqInfo.collectionName === 'activity') {
      return reqInfo.utils.createResponse$(() => ({ body: db.activity, status: 200 }));
    }

    if (reqInfo.collectionName === 'analytics') {
      return reqInfo.utils.createResponse$(() => ({ body: db.analytics, status: 200 }));
    }

    if (reqInfo.collectionName === 'content' && !reqInfo.id) {
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
      const status = reqInfo.query.get('status')?.[0];
      const filtered = status
        ? db.newsletters.filter((item) => item['status'] === status)
        : db.newsletters;
      return reqInfo.utils.createResponse$(() => ({ body: filtered, status: 200 }));
    }

    if (reqInfo.collectionName === 'vouchers' && !reqInfo.id) {
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
