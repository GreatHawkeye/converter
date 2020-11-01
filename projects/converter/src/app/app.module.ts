import * as fromStore from '@store';

import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Effects } from '@store';
import { EffectsModule } from '@ngrx/effects';
import { PATH } from './settings';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      { [fromStore.featureKey]: fromStore.appReducer },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: false,
        },
      }
    ),
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: `${PATH.CONVERTER}`,
          pathMatch: 'full',
        },
        {
          path: PATH.CONVERTER,
          loadChildren: () =>
            import('./pages/converter/converter.module').then(
              (m) => m.ConverterModule
            ),
        },
      ],
      {
        initialNavigation: 'enabled',
        scrollPositionRestoration: 'enabled',
      }
    ),
    EffectsModule.forRoot([fromStore.Effects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
