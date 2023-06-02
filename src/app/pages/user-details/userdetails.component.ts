import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.services';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { HeaderService } from 'src/app/services/header.services';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-requests',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserDetailsComponent implements OnInit {
  requests: any = [];
  userId : any = [];
  fromDate:Date= new Date();
  toDate:Date= new Date();
  page: number = 1; // Current page number
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  count: number = 0;
  
  constructor(private userService: UserService, private sharedService: SharedService, private datePipe:DatePipe, private headerService:HeaderService) {

  }
  ngOnInit(): void {
    this.headerService.setHeaderVisibility(true);
    this.fromDate.setDate( this.fromDate.getDate() -10 );
    this.userId = this.sharedService.getUserId();
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUsers(this.userId).subscribe((response: any) => {
      this.requests = response.data;
    });
  }
  onRefreshRequests()
  {
    console.log(this.fromDate);
    this.getAllUsers();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllUsers();
  }
}
