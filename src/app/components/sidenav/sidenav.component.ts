import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() isExpanded: boolean = true;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private authService:AuthService)
  {

  }

  handleSidebarToggle()
  {
    this.isExpanded=!this.isExpanded;
  };
  onLogout()
  {
    this.authService.logout();
  }
}
