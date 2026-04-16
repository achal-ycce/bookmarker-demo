import { createReducer, on } from '@ngrx/store';
import { add, remove, clear, edit } from '../action/app.action';
import { AppState } from '../app.state';

export const initialState: AppState = {
  bookmarkers: [
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
    },
    {
      bookmarkerId: 3,
      name: 'TypeScript',
      url: 'https://www.typescriptlang.org',
      datetime: new Date('2026-04-16T14:15:00Z')
    },
    {
      bookmarkerId: 4,
      name: 'StackBlitz',
      url: 'https://stackblitz.com',
      datetime: new Date('2026-04-17T16:00:00Z')
    },
    {
      bookmarkerId: 5,
      name: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      datetime: new Date('2026-04-14T08:45:00Z')
    },
    {
      bookmarkerId: 6,
      name: 'GitHub',
      url: 'https://github.com',
      datetime: new Date('2026-04-14T18:20:00Z')
    },
    {
      bookmarkerId: 7,
      name: 'RxJS',
      url: 'https://rxjs.dev',
      datetime: new Date('2026-04-15T10:10:00Z')
    },
    {
      bookmarkerId: 8,
      name: 'Angular Material',
      url: 'https://material.angular.io',
      datetime: new Date('2026-04-15T12:50:00Z')
    }
  ]
};

export const BookmarkerReducer = createReducer(
  initialState,
  on(add, (state, {bookmarker}) => (
    {
      ...state,
      bookmarkers: [...state.bookmarkers, bookmarker]
    }
  )
  ),
  on(remove, (state, {bookmarker}) => ({
    ...state,
    bookmarkers: state.bookmarkers.filter((p)=> bookmarker.bookmarkerId != p.bookmarkerId)
  })),
  on(edit, (state, {bookmarker}) => ({
    ...state,
    bookmarkers: state.bookmarkers.map(p => p.bookmarkerId === bookmarker.bookmarkerId ? bookmarker : p)
  })),
  on(clear, state => initialState)
);
