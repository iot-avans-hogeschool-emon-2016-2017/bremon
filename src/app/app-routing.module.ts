/**
 * Created by Bart on 7-4-2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import {TrendComponent} from "./trend/trend.component";

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'trend', component: TrendComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
