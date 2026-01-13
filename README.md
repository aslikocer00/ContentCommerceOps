# SheerLuxe Content & Commerce Ops Console

Internal dashboard demo for editorial + commerce teams to plan content, manage newsletters, and monitor affiliate performance.

## Tech Stack
- Angular 17 (Standalone Components + Router)
- TypeScript + RxJS + Angular Signals
- SCSS with CSS variables (light/dark theme)
- Angular in-memory-web-api for mocked REST endpoints
- Karma/Jasmine for unit tests

## Architecture Overview
- Feature-based structure: `features/dashboard`, `features/content`, `features/newsletter`, `features/vouchers`, `features/analytics`, `features/settings`.
- Lazy-loaded routes in `src/app/app.routes.ts` with auth + role guards.
- Interceptors:
  - `AuthInterceptor` injects a fake bearer token
  - `LoadingInterceptor` toggles a global loading bar
  - `ErrorInterceptor` normalizes errors and raises toast notifications
- State:
  - RxJS `BehaviorSubject` streams for auth, date range, table state, and selected content (`src/app/core/app-state.service.ts`)
  - Angular Signals for derived newsletter analytics (`src/app/features/newsletter/newsletter-analytics.store.ts`)

## Mock API
Backed by `angular-in-memory-web-api` in `src/app/core/mock-api.service.ts`.

Endpoints:
- `POST /auth/login`
- `GET /me`
- `GET /kpis?from=&to=`
- `GET /activity?from=&to=`
- `GET /content?query=&category=&status=&page=&pageSize=&sort=`
- `GET /content/:id`
- `POST /content`
- `PUT /content/:id`
- `GET /newsletters?status=&page=&pageSize=`
- `GET /newsletters/:id`
- `POST /newsletters`
- `GET /vouchers?merchant=&active=&page=&pageSize=&sort=`
- `POST /vouchers`
- `PUT /vouchers/:id`
- `GET /analytics?from=&to=`

## Local Development
```bash
npm install
npm run start
```

The app runs on `http://localhost:4200`.

## Tests
```bash
npm run test
```

## Environment Config
Update `src/environments/environment.development.ts` or `src/environments/environment.ts` with a real `apiBaseUrl` when integrating with a backend.

## Deployment (Vercel/Netlify)
Build the app:
```bash
npm run build
```

SPA fallback:
- **Vercel:** add a `vercel.json` with `rewrites` to `/index.html`.
- **Netlify:** add a `_redirects` file with `/* /index.html 200`.

## Notes
Default login emails: `admin@sheerluxe.com`, `editor@sheerluxe.com`, `commerce@sheerluxe.com` (any password with 6+ characters).
