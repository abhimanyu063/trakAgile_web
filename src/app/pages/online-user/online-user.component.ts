import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.services';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { HeaderService } from 'src/app/services/header.services';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-requests',
  templateUrl: './online-user.component.html',
  styleUrls: ['./online-user.component.scss']
})
export class OnlineUserComponent implements OnInit {
  requests: any = [];
  page: number = 1; // Current page number
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  count: number = 0;
  supervisorId: Number = 0; 
  constructor(private userService: UserService, private sharedService: SharedService, private datePipe:DatePipe, private headerService:HeaderService) {

  }
  ngOnInit(): void {
    this.headerService.setHeaderVisibility(true);
    this.supervisorId = this.sharedService.getUserId();
    this.getOnlineUsers();
  }
  getOnlineUsers() {
    this.userService.getOnlineUsers(this.supervisorId).subscribe((response: any) => {
      this.requests = response.data;
      console.log(this.requests)
    });
  }
  onRefreshRequests()
  {
    this.getOnlineUsers();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getOnlineUsers();
  }
}
