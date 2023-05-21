import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.services';
import { HeaderService } from 'src/app/services/header.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalRequests: Number;
  approvedRequestCount: Number;
  pendingRequestCount: Number;
  activeUserCount: number;
  siteWorkInprogressCount: number;
  tripStartedCount: number;
  tripEndedCount: number;
  siteWorkCompletedCount: number;
  reportedSiteIssueCount: number;
  totalSiteVisited: number;

  constructor(private dashboardService: DashboardService, private headerService:HeaderService) {

  }
  ngOnInit(): void {
    //this.headerService.setHeaderVisibility(false);
    this.getTotalRequests();
    this.getDashboardDetail();
  }

  getTotalRequests() {
    this.totalRequests = 200;
  }
  async getDashboardDetail() {
    
    this.dashboardService.getDashboardDetails().subscribe((result: any) => {
      this.approvedRequestCount = result.data.approvedRequestCount;
      this.pendingRequestCount = result.data.pendingRequestCount;
      this.activeUserCount = result.data.activeUserCount;
      this.siteWorkInprogressCount = result.data.siteWorkInprogressCount;
      this.tripStartedCount = result.data.tripStartedCount;
      this.tripEndedCount = result.data.tripEndedCount;
      this.siteWorkCompletedCount = result.data.siteWorkCompletedCount;
      this.reportedSiteIssueCount = result.data.reportedSiteIssueCount;
      this.totalSiteVisited = this.tripStartedCount + this.tripEndedCount;
    });
  }
}
