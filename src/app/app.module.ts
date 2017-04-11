import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import 'hammerjs';

import {MaterialModule} from '@angular/material';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { ChartComponent } from './chart/chart.component';
import { DayComponent } from './day/day.component';
import { CurrentComponent } from './current/current.component';

import { AuthService } from "./auth.service"
import { LoginService } from "./login/login.service";
import { MeasurementService } from './measurement.service';

import { AppRoutingModule } from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    TestComponent,
    ChartComponent,
    DayComponent,
    CurrentComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    LoginService,
    MeasurementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
