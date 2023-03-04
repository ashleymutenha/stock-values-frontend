import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksComponent } from './stocks/stocks.component';
import { SelectedStockComponent } from './selected-stock/selected-stock.component';


@NgModule({
  declarations: [
    StocksComponent,
    SelectedStockComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[StocksComponent, SelectedStockComponent]
})
export class PagesModule { }
