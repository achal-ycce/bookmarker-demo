import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import {
  loadItems,
  loadItemsSuccess,
  loadItemsFailure,
} from '../action/app.action';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class GetBookmarkersEffects {
  private readonly actions$ = inject(Actions);
  private readonly http = inject(HttpClient);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      mergeMap(() =>
        this.http.get<any[]>('/api/bookmarkers').pipe(
          map((items) => loadItemsSuccess({ bookmarkers: items })),
          catchError((error) => of(loadItemsFailure({ error }))),
        ),
      ),
    ),
  );
}
