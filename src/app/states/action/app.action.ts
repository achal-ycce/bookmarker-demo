import { createAction, props } from '@ngrx/store';
import { Bookmarker } from '../../models/bookmarker';
export const add = createAction('[Bookmarker] Add',  props<{ bookmarker: Bookmarker }>());
export const remove = createAction('[Bookmarker] Remove', props<{ bookmarker: Bookmarker }>());
export const edit = createAction('[Bookmarker] edit state of bookmarker ', 
 props<{ bookmarker: Bookmarker }>());
export const clear = createAction('[Bookmarker] Clear');
