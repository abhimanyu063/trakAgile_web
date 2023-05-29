import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.services';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { HeaderService } from 'src/app/services/header.services';

@Component({
  selector: 'app-requests',
  templateUrl: './site-reported.component.html',
  styleUrls: ['./site-reported.component.scss']
})
export class SiteReportedComponent implements OnInit {
  requests: any = []
  fromDate:Date= new Date();
  toDate:Date= new Date();
  events: any = [];
  page: number = 1; // Current page number
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  count: number = 0;

  constructor(private siteService: SiteService, private datePipe:DatePipe, private headerService:HeaderService) {

  }
  ngOnInit(): void {
    this.headerService.setHeaderVisibility(true);
    this.fromDate.setDate( this.fromDate.getDate() -10 );
    this.getAllSiteReportedIsuue();
  }
  getAllSiteReportedIsuue() {
    var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var todayDate = `${yyyy}-${mm}-${dd}`;
        this.siteService.getAllSites('2023-05-01', todayDate, 3).subscribe((response: any) => {
          this.requests = response.data;
        });
  }
  onRefreshRequests()
  {
    console.log(this.fromDate);
    this.getAllSiteReportedIsuue();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllSiteReportedIsuue();
  }
}