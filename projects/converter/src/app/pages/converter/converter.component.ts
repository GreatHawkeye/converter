import * as fromStore from '@store';

import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { MatSliderChange } from '@angular/material/slider';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterComponent implements OnDestroy {
  private subscription: Subscription;

  amountFieldValue$ = this.store.select(fromStore.selectAmountFieldValue);
  exchangeRate$ = this.store.select(fromStore.selectExchangeRate);
  exchangeRateVariation$ = this.store.select(
    fromStore.selectExchangeRateVariation
  );
  from$ = this.store.select(fromStore.selectFrom);
  tableDataSource$ = this.store.select(fromStore.selectTableDataSource);
  tableDisplayedColumns$ = this.store.select(
    fromStore.selectTableDisplayedColumns
  );
  to$ = this.store.select(fromStore.selectTo);
  totalExchangeRate$ = this.store.select(fromStore.selectTotalExchangeRate);

  constructor(private store: Store<fromStore.State>) {
    store.dispatch(fromStore.initExchangeRate());

    this.subscription = this.store
      .select(fromStore.selectExchangeRate)
      .subscribe(() => this.store.dispatch(fromStore.initConversion()));
  }

  formatLabel(value: number): string {
    return `${value / 100}%`;
  }

  updateExchangeRateVariation(event: MatSliderChange): void {
    this.store.dispatch(
      fromStore.setExchangeRateVariation({ value: event.value / 100 })
    );
    this.store.dispatch(fromStore.initConversion());
  }

  calculate(): void {
    this.store.dispatch(fromStore.updateFromValue());
    this.store.dispatch(fromStore.initNewEntryInHistoryTable());
  }

  switchCurrency(): void {
    this.store.dispatch(fromStore.switchCurrency());
  }
  updateAmountFieldValue(value: string): void {
    this.store.dispatch(
      fromStore.updateAmountFieldValue({ value: Number(value) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
