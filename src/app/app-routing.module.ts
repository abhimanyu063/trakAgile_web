import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeRegistrationComponent } from './pages/employee-registration/employee-registration.component';
import { EmployeeTrackingComponent } from './pages/employee-tracking/employee-tracking.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { SiteComponent } from './pages/site/site.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'employee-registration', component: EmployeeRegistrationComponent },
  { path: 'employee-tracking', component: EmployeeTrackingComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'sites', component: SiteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
