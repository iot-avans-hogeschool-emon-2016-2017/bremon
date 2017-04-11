import {RouterModule, RouterStateSnapshot, ActivatedRouteSnapshot, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "./home/home.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: ["authGuard"]},
];

export const routingProviders = [
  {provide: "authGuard", useValue: authGuard}
];

export function authGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (!this.authService.isAuthenticated()) {
    this.router.navigate(["/"]);
    return false;
  } else {
    return true;
  }
}
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
