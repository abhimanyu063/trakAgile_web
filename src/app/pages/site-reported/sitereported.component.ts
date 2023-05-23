import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.services';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { HeaderService } from 'src/app/services/header.services';

@Component({
  selector: 'app-requests',
  templateUrl: './sitereported.component.html',
  styleUrls: ['./sitereported.component.scss']
})
export class SiteReportedComponent implements OnInit {
  requests: any = []
  fromDate:Date= new Date();
  toDate:Date= new Date();
  
  constructor(private siteService: SiteService, private datePipe:DatePipe, private headerService:HeaderService) {

  }
  ngOnInit(): void {
    this.headerService.setHeaderVisibility(true);
    this.fromDate.setDate( this.fromDate.getDate() -10 );
    this.getAllSiteReportedIsuue();
  }
  getAllSiteReportedIsuue() {
    this.siteService.getAllSiteReportedIsuue().subscribe((response: any) => {
      this.requests = response.data;
      console.log(this.requests)
    });
  }
  onRefreshRequests()
  {
    console.log(this.fromDate);
    this.getAllSiteReportedIsuue();
  }
}
