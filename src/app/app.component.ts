import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { HeaderService } from './services/header.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  title = 'Trak Agile';
  sidebarExpanded = true;
  isHeaderVisible$: Observable<boolean>;
  constructor(private authService: AuthService, private router: Router, private headerService: HeaderService) {

  }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isHeaderVisible$ = this.headerService.isHeaderVisible;
  }
}
