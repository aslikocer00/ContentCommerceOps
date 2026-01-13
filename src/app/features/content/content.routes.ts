import { Routes } from '@angular/router';
import { ContentPlannerComponent } from './content-planner.component';
import { ContentDetailComponent } from './content-detail.component';
import { ContentFormComponent } from './content-form.component';

export const CONTENT_ROUTES: Routes = [
  { path: '', component: ContentPlannerComponent },
  { path: 'new', component: ContentFormComponent },
  { path: ':id', component: ContentDetailComponent },
  { path: ':id/edit', component: ContentFormComponent },
];
