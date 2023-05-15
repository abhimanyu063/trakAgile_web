import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.services';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  requests:any=[]
  constructor(private requestService:RequestService)
  {

  }
  ngOnInit(): void {
    this.getRequests();
  }
  getRequests()
  {
    this.requestService.getRequests(1).subscribe((response:any)=>{
      this.requests=response.data;
    });
  }

}
