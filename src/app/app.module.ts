import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'hammerjs';

import {MaterialModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import {routing, routingProviders} from "./app.routing";
import {AppManagerComponent} from "./app-manager.component";

import {AuthService} from "./auth.service"
import {LoginService} from "./login/login.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppManagerComponent,
    LoginComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [routingProviders, AuthService, LoginService],
  bootstrap: [AppComponent, AppManagerComponent]
})
export class AppModule { }
