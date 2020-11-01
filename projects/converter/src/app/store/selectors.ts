import * as fromReducer from './reducer';

import { createSelector } from '@ngrx/store';

export const selectPollingInterval = createSelector(
  fromReducer.getState,
  ({ pollingInterval }) => pollingInterval
);

export const selectTo = createSelector(fromReducer.getState, ({ to }) => to);
export const selectMaxEchangeRateGap = createSelector(
  fromReducer.getState,
  ({ maxExchangeRateGap }) => maxExchangeRateGap
);
export const selectMinEchangeRateGap = createSelector(
  fromReducer.getState,
  ({ minExchangeRateGap }) => minExchangeRateGap
);
export const selectTotalExchangeRate = createSelector(
  fromReducer.getState,
  ({ totalExchangeRate }) => totalExchangeRate
);
export const selectExchangeRateVariation = createSelector(
  fromReducer.getState,
  ({ exchangeRateVariation }) => exchangeRateVariation
);
export const selectExchangeRate = createSelector(
  fromReducer.getState,
  ({ exchangeRate }) => exchangeRate
);
export const selectFrom = createSelector(
  fromReducer.getState,
  ({ from }) => from
);
export const selectTableDisplayedColumns = createSelector(
  fromReducer.getState,
  ({ table: { displayedColumns } }) => displayedColumns
);
export const selectTableDataSource = createSelector(
  fromReducer.getState,
  ({ table: { dataSource } }) => dataSource
);

export const selectAmountFieldValue = createSelector(
  fromReducer.getState,
  ({ amountFieldValue }) => amountFieldValue
);
