import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { BookmarkerReducer } from './states/reducer/app.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockDBService } from './services/mock-db-service';
import { provideEffects } from '@ngrx/effects';
import { GetBookmarkersEffects } from './states/effects/getbookmarkers.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideStore({ bookmarkers: BookmarkerReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(MockDBService)),
    provideEffects([GetBookmarkersEffects]),
  ],
};
