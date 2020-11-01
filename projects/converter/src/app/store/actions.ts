import { createAction, props } from '@ngrx/store';

export const initExchangeRate = createAction('[Converter] initExchangeRate');
export const setExchangeRate = createAction(
  '[Converter] setExchangeRate',
  props<{ value: number }>()
);

export const initConversion = createAction('[Converter] initConversion');

export const setExchangeRateVariation = createAction(
  '[Converter] initExchangeRateVariation',
  props<{ value: number }>()
);

export const initNewEntryInHistoryTable = createAction(
  '[Converter] initNewEntryInHistoryTable'
);
export const setNewEntryInHistoryTable = createAction(
  '[Converter] setNewEntryInHistoryTable',
  props<{
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
  }>()
);

export const updateAmountFieldValue = createAction(
  '[Converter] updateAmountFieldValue',
  props<{ value: number }>()
);
export const updateFromValue = createAction('[Converter] updateFromValue');

export const updateToValue = createAction(
  '[Converter] updateToValue',
  props<{ value: number }>()
);

export const switchCurrency = createAction('[Converter] switchCurrency');
