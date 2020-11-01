import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ConverterComponent } from './converter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: ConverterComponent }];

@NgModule({
  declarations: [ConverterComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ],

  providers: [CurrencyPipe],
})
export class ConverterModule {}
