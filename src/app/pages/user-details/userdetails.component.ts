import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.services';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { HeaderService } from 'src/app/services/header.services';

@Component({
  selector: 'app-requests',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserDetailsComponent implements OnInit {
  requests: any = []
  fromDate:Date= new Date();
  toDate:Date= new Date();
  
  constructor(private userService: UserService, private datePipe:DatePipe, private headerService:HeaderService) {

  }
  ngOnInit(): void {
    this.headerService.setHeaderVisibility(true);
    this.fromDate.setDate( this.fromDate.getDate() -10 );
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe((response: any) => {
      this.requests = response.data;
      console.log(this.requests)
    });
  }
  onRefreshRequests()
  {
    console.log(this.fromDate);
    this.getAllUsers();
  }
}
