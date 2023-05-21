import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeRegistrationComponent } from './pages/employee-registration/employee-registration.component';
import { EmployeeTrackingComponent } from './pages/employee-tracking/employee-tracking.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { SiteComponent } from './pages/site/site.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'employee-registration', component: EmployeeRegistrationComponent, canActivate:[AuthGuard] },
  { path: 'employee-tracking', component: EmployeeTrackingComponent, canActivate:[AuthGuard] },
  { path: 'requests', component: RequestsComponent, canActivate:[AuthGuard] },
  { path: 'sites', component: SiteComponent, canActivate:[AuthGuard] },
  { path: 'home', component: DashboardComponent, canActivate:[AuthGuard] },
  {path:'login', component:SignInComponent},
  {path:'forgot-password', component:ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
