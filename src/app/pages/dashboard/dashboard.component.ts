import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalRequests: Number
  approvedRequests: Number;
  pendingRequests: Number;

  constructor(private dashboardService: DashboardService) {

  }
  ngOnInit(): void {
    this.getTotalRequests();
    this.getDashboardDetail();
  }

  getTotalRequests() {
    this.totalRequests = 200;
  }
  async getDashboardDetail() {
    this.dashboardService.getDashboardDetails().subscribe((result: any) => {
      this.approvedRequests = result.data.approvedRequestCount;
      this.pendingRequests = result.data.pendingRequestCount;
    });

  }
}
