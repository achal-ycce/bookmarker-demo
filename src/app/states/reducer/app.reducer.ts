import { createReducer, on } from '@ngrx/store';
import { add, remove, clear, edit, loadItems, loadItemsSuccess } from '../action/app.action';
import { AppState } from '../app.state';

export const initialState: AppState = {
  bookmarkers: [],
  loading: false
}

export const BookmarkerReducer = createReducer(
  initialState,
  on(loadItems, state => ({ ...state, loading: true })),
  on(loadItemsSuccess, (state, { bookmarkers }) => ({ 
    ...state, 
    bookmarkers,
    loading: false
  })),
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
