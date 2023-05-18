import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SiteComponent } from './pages/site/site.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { EmployeeTrackingComponent } from './pages/employee-tracking/employee-tracking.component';
import { EmployeeRegistrationComponent } from './pages/employee-registration/employee-registration.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SiteService } from './services/site.services';
import { ApiHttpService } from './services/ApiHttpService.services';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { RequestService } from './services/request.services';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { AppMaterialModule } from './app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    SiteComponent,
    RequestsComponent,
    EmployeeTrackingComponent,
    EmployeeRegistrationComponent,
    SidenavComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule,
    AppMaterialModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    }),
    
  ],
  providers: [SiteService, ApiHttpService, HttpClient, RequestService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
