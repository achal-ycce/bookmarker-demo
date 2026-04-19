import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class MockDBService implements InMemoryDbService {
  bookmarkers = [
    {
      bookmarkerId: 1,
      name: 'Angular Docs',
      url: 'https://angular.io',
      datetime: '2026-04-20T13:00:00Z',
    },
    {
      bookmarkerId: 2,
      name: 'NgRx Guide',
      url: 'https://ngrx.io',
      datetime: '2026-04-19T15:30:00Z',
    },
    {
      bookmarkerId: 3,
      name: 'TypeScript',
      url: 'https://www.typescriptlang.org',
      datetime: '2026-04-16T14:15:00Z',
    },
    {
      bookmarkerId: 4,
      name: 'StackBlitz',
      url: 'https://stackblitz.com',
      datetime: '2026-04-17T16:00:00Z',
    },
    {
      bookmarkerId: 5,
      name: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      datetime: '2026-04-18T08:45:00Z',
    },
    {
      bookmarkerId: 6,
      name: 'GitHub',
      url: 'https://github.com',
      datetime: '2026-04-14T18:20:00Z',
    },
    {
      bookmarkerId: 7,
      name: 'RxJS',
      url: 'https://rxjs.dev',
      datetime: '2026-04-15T10:10:00Z',
    },
    {
      bookmarkerId: 8,
      name: 'Angular Material',
      url: 'https://material.angular.io',
      datetime: '2026-04-15T12:50:00Z',
    },
  ];

  createDb() {
    return { bookmarkers: this.bookmarkers };
  }
}
