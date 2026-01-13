import { Routes } from '@angular/router';
import { NewsletterListComponent } from './newsletter-list.component';
import { NewsletterBuilderComponent } from './newsletter-builder.component';
import { NewsletterPreviewComponent } from './newsletter-preview.component';
import { NewsletterAnalyticsComponent } from './newsletter-analytics.component';

export const NEWSLETTER_ROUTES: Routes = [
  { path: '', component: NewsletterListComponent },
  { path: 'builder', component: NewsletterBuilderComponent },
  { path: 'preview/:id', component: NewsletterPreviewComponent },
  { path: 'analytics', component: NewsletterAnalyticsComponent },
];
