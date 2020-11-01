import * as fromActions from './actions';

import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';

export const featureKey = 'converter';

export interface State {
  amountFieldValue: number;
  exchangeRate: number;
  totalExchangeRate: number;
  exchangeRateVariation: number;
  from: {
    currency: string;
    value: number;
  };
  to: {
    currency: string;
    value: number;
  };
  maxExchangeRateGap: number;
  minExchangeRateGap: number;
  pollingInterval: number;
  table: {
    limit: number;
    displayedColumns: string[];
    dataSource: {
      randomExchangeRate: number;
      forcedExchangeRate: number;
      from: {
        currency: string;
        value: number;
      };
      to: {
        currency: string;
        value: number;
      };
    }[];
  };
}

const initialState: State = {
  amountFieldValue: 1,
  exchangeRateVariation: 0,
  totalExchangeRate: null,
  exchangeRate: null,
  from: {
    currency: 'EUR',
    value: 1,
  },
  to: {
    currency: 'USD',
    value: null,
  },
  maxExchangeRateGap: 2,
  minExchangeRateGap: 0.5,
  pollingInterval: 3000,
  table: {
    limit: 5,
    displayedColumns: [
      'randomExchangeRate',
      'forcedExchangeRate',
      'from',
      'to',
    ],
    dataSource: [],
  },
};

const reducer = createReducer(
  initialState,

  on(fromActions.setExchangeRate, (state, { value }) => {
    return {
      ...state,
      exchangeRate: value,
      totalExchangeRate: value + (state.exchangeRateVariation / 100) * value,
    };
  }),
  on(fromActions.setExchangeRateVariation, (state, { value }) => {
    return {
      ...state,
      exchangeRateVariation: value,
      totalExchangeRate:
        state.exchangeRate + (value / 100) * state.exchangeRate,
    };
  }),

  on(
    fromActions.setNewEntryInHistoryTable,
    (state, { forcedExchangeRate, randomExchangeRate, from, to }) => ({
      ...state,
      table: {
        ...state.table,
        dataSource:
          state.table.dataSource.length === state.table.limit
            ? state.table.dataSource.slice(1).concat({
                forcedExchangeRate,
                randomExchangeRate,
                from: {
                  currency: from.currency,
                  value: from.value,
                },
                to: {
                  currency: to.currency,
                  value: to.value,
                },
              })
            : [
                ...state.table.dataSource,
                {
                  forcedExchangeRate,
                  randomExchangeRate,
                  from: {
                    currency: from.currency,
                    value: from.value,
                  },
                  to: {
                    currency: to.currency,
                    value: to.value,
                  },
                },
              ],
      },
    })
  ),

  on(fromActions.updateAmountFieldValue, (state, { value }) => ({
    ...state,
    amountFieldValue: value,
  })),

  on(fromActions.updateToValue, (state, { value }) => ({
    ...state,
    to: {
      ...state.to,
      value,
    },
  })),
  on(fromActions.updateFromValue, (state) => ({
    ...state,
    from: {
      ...state.from,
      value: state.amountFieldValue,
    },
  })),

  on(fromActions.switchCurrency, (state) => ({
    ...state,
    exchangeRate: 1 / state.exchangeRate,
    totalExchangeRate:
      1 / state.exchangeRate +
      (state.exchangeRateVariation / 100) * state.exchangeRate,
    from: {
      ...state.from,
      currency: state.to.currency,
    },
    to: {
      ...state.to,
      currency: state.from.currency,
    },
  }))
);

export function appReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}

export const getState = createFeatureSelector<State>(featureKey);
