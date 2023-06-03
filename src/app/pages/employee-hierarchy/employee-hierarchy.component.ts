import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-employee-hierarchy',
  templateUrl: './employee-hierarchy.component.html',
  styleUrls: ['./employee-hierarchy.component.scss']
})
export class EmployeeHierarchyComponent implements OnInit {
  nodes:any=[];
  supervisorId : Number = 0; 
  constructor(private userService:UserService, private sharedService: SharedService)
  {

  }
  ngOnInit(): void {
    this.supervisorId = this.sharedService.getUserId();
    this.onGetUserHierarchy();
  }
  async onGetUserHierarchy()
  {
    console.log(this.supervisorId);
    this.userService.getUserHierarchy(this.supervisorId).subscribe((response:any)=>{
      this.nodes=response.data;
      console.log(this.nodes);
    });
  }
}


