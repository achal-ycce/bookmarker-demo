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
      datetime: new Date('2026-04-17T09:00:00Z')
    },
    {
      bookmarkerId: 2,
      name: 'NgRx Guide',
      url: 'https://ngrx.io',
      datetime: new Date('2026-04-11T11:30:00Z')
    }
  ];

  createDb() {
    return { bookmarkers: this.bookmarkers };
  }

}