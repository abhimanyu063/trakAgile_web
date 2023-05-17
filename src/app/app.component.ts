import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  title = 'Trak Agile';
  sidebarExpanded = true;
  constructor(private authService:AuthService)
  {

  }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  onLogout() {
    this.authService.logout();
  }
}
