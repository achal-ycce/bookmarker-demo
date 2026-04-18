import { createAction, props } from '@ngrx/store';
import { Bookmarker } from '../../models/bookmarker';
export const add = createAction('[Bookmarker] Add',  props<{ bookmarker: Bookmarker }>());
export const remove = createAction('[Bookmarker] Remove', props<{ bookmarker: Bookmarker }>());
export const edit = createAction('[Bookmarker] edit state of bookmarker ', 
 props<{ bookmarker: Bookmarker }>());
export const clear = createAction('[Bookmarker] Clear');

export const loadItems = createAction('[App] Load Items');
export const loadItemsSuccess = createAction(
  '[App] Load Items Success',
  props<{ bookmarkers: Bookmarker[] }>()
);
export const loadItemsFailure = createAction(
  '[App] Load Items Failure',
  props<{ error: any }>()
);