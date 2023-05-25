import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeRegistrationComponent } from './pages/employee-registration/employee-registration.component';
import { EmployeeTrackingComponent } from './pages/employee-tracking/employee-tracking.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { SiteComponent } from './pages/site/site.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { UserDetailsComponent } from './pages/user-details/userdetails.component';
import { SiteReportedComponent } from './pages/site-reported/sitereported.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { OnlineUserComponent } from './pages/online-user/online-user.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'employee-registration', component: EmployeeRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'employee-tracking', component: EmployeeTrackingComponent, canActivate: [AuthGuard] },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard] },
  { path: 'sites', component: SiteComponent, canActivate: [AuthGuard] },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SignInComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'userdetails', component: UserDetailsComponent },
  { path: 'sitereporteddetails', component: SiteReportedComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'online-user', component: OnlineUserComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
