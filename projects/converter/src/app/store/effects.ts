import * as fromActions from './actions';
import * as fromReducer from './reducer';
import * as fromSelectors from './selectors';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';

@Injectable()
export class Effects {
  initExchangeRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.initExchangeRate),
      withLatestFrom(
        this.store.select(fromSelectors.selectPollingInterval),
        this.store.select(fromSelectors.selectMaxEchangeRateGap),
        this.store.select(fromSelectors.selectMinEchangeRateGap)
      ),
      switchMap(
        ([_, pollingInterval, maxExchangeRateGap, minExchangeRateGap]) =>
          timer(0, pollingInterval).pipe(
            map(() =>
              fromActions.setExchangeRate({
                value:
                  Math.random() * (maxExchangeRateGap - minExchangeRateGap) +
                  minExchangeRateGap,
              })
            )
          )
      )
    )
  );

  initNewEntryInHistoryTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.initNewEntryInHistoryTable),
      withLatestFrom(
        this.store.select(fromSelectors.selectAmountFieldValue),
        this.store.select(fromSelectors.selectFrom),
        this.store.select(fromSelectors.selectTo),
        this.store.select(fromSelectors.selectExchangeRate),
        this.store.select(fromSelectors.selectTotalExchangeRate)
      ),
      map(([_, amountFieldValue, from, to, exchangeRate, totalExchangeRate]) =>
        fromActions.setNewEntryInHistoryTable({
          forcedExchangeRate: totalExchangeRate,
          from: {
            value: amountFieldValue,
            currency: from.currency,
          },
          to: {
            value: to.value,
            currency: to.currency,
          },
          randomExchangeRate: exchangeRate,
        })
      )
    )
  );

  updateFromValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateFromValue),
      withLatestFrom(
        this.store.select(fromSelectors.selectAmountFieldValue),
        this.store.select(fromSelectors.selectTotalExchangeRate)
      ),
      map(([_, amountFieldValue, totalExchangeRate]) =>
        fromActions.updateToValue({
          value: amountFieldValue * totalExchangeRate,
        })
      )
    )
  );

  initConversion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.initConversion),
      withLatestFrom(
        this.store.select(fromSelectors.selectFrom),
        this.store.select(fromSelectors.selectTotalExchangeRate)
      ),
      map(([_, from, totalExchangeRate]) =>
        fromActions.updateToValue({
          value: from.value * totalExchangeRate,
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromReducer.State>
  ) {}
}
