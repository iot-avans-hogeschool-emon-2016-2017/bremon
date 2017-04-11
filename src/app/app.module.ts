import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { DayComponent } from './day/day.component';

import { MeasurementService} from './measurement.service';
import { CurrentComponent } from './current/current.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DayComponent,
    CurrentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule
  ],
  providers: [
    MeasurementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
