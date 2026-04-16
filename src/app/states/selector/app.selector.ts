import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Bookmarker } from '../../models/bookmarker';

export const selectAppState = createFeatureSelector<AppState>('bookmarkers');

export const selectBookmarkers = createSelector(
  selectAppState,
  (state: AppState) => state.bookmarkers
);

export const selectBookmarkerById = (id: number) =>
  createSelector(
    selectBookmarkers,
    (bookmarkers: Bookmarker[]) => bookmarkers.find(b => b.bookmarkerId === id)
  );