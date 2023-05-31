import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-employee-hierarchy',
  templateUrl: './employee-hierarchy.component.html',
  styleUrls: ['./employee-hierarchy.component.scss']
})
export class EmployeeHierarchyComponent implements OnInit {
  nodes:any=[];
  constructor(private userService:UserService)
  {

  }
  ngOnInit(): void {
    this.onGetUserHierarchy();
  }
  async onGetUserHierarchy()
  {
    this.userService.getUserHierarchy().subscribe((response:any)=>{
      this.nodes=response.data;
      console.log(this.nodes);
    });
  }
}


