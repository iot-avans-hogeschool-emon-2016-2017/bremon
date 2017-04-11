/**
 * Created by Bart on 7-4-2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from "./test/test.component";
import { DayComponent } from './day/day.component';
import { CurrentComponent } from './current/current.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'test', component: TestComponent },
    { path: 'day', component: DayComponent },
    { path: 'current', component: CurrentComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
