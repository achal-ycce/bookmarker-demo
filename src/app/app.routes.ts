import { Routes } from '@angular/router';
import { BookmarkerList } from './bookmarker-list/bookmarker-list';
export const routes: Routes = [
  { path: '', redirectTo: '/bookmarker-list', pathMatch: 'full' },
  { path: 'bookmarker-list', component: BookmarkerList },
  { 
    path: 'new-bookmarker', 
    loadComponent: () => import('./new-bookmarker/new-bookmarker').then(m => m.NewBookmarker) 
  },
  { 
    path: 'new-bookmarker/:id', 
    loadComponent: () => import('./new-bookmarker/new-bookmarker').then(m => m.NewBookmarker) 
  }
];
