import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.services';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  requests: any = []
  constructor(private requestService: RequestService) {

  }
  ngOnInit(): void {
    this.getRequests();
  }
  getRequests() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var todayDate = `${yyyy}-${mm}-${dd}`;
    this.requestService.getAllRequests('2023-05-01', todayDate).subscribe((response: any) => {
      this.requests = response.data;
    });
  }

}
