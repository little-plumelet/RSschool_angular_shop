import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { getCategories, getCategoriesFailed, getCategoriesSuccessful } from '../actions/categories-actions';

@Injectable({
  providedIn: 'any',
})
export class CategoriesEffects {
  constructor(
    private actions: Actions,
    private httpRequestService: HttpRequestsService,
  ) {}

  getCategories: Observable<Action> = createEffect(() => this.actions.pipe(
    ofType(getCategories),
    switchMap(() => this.httpRequestService.getCategories().pipe(
      map((categories) => {
        console.log('categories = ', categories);
        return getCategoriesSuccessful({ categories });
      }),
      catchError((error) => of(getCategoriesFailed({ error }))),
    )),
  ));
}
