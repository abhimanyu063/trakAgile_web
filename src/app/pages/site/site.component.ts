import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.services';
import { SiteService } from 'src/app/services/site.services';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})

export class SiteComponent implements OnInit {
  sites: any = [];
  requests: any = []
  fromDate: Date = new Date();
  toDate: Date = new Date();
  event: any = [];
  events: any = [];
  page: number = 1; // Current page number
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  count: number = 0;
  constructor(private SiteService: SiteService, private headerService: HeaderService, private datePipe: DatePipe) {

  }
  ngOnInit(): void {
    this.headerService.setHeaderVisibility(true);
    this.fromDate.setDate(this.fromDate.getDate() - 10);
    this.toDate.setDate(this.toDate.getDate() - 10);
    this.getSites();
  }
  getSites() {
    try {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      var todayDate = `${yyyy}-${mm}-${dd}`;
      this.SiteService.getAllSites('2023-05-01', todayDate, 0).subscribe((response: any) => {
        this.sites = response.data;
      });
    }
    catch (error) {
      console.log('error', error);
    }
  }
  public openPDF(): void {
    try {
      let DATA: any = document.getElementById('requestReport');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('Request.pdf');
      });
    }
    catch (error) {
      console.log('error', error);
    }
  }
  onRefreshRequests() {
    try {
      this.SiteService.getAllSites(this.fromDate, this.toDate, 0).subscribe((response: any) => {
        this.sites = response.data;
      });
    }
    catch (error) {
      console.log('error', error);
    }
  }
  onChange(event: any) {
    try {
      if (event.target.value == 0) {
        this.page = event;
        this.getSites()
      }
      else if (event.target.value == 1) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var todayDate = `${yyyy}-${mm}-${dd}`;
        var date = new Date();
        var dd = String(today.getDate() - 7).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var weeklyDate = `${yyyy}-${mm}-${dd}`;
        this.SiteService.getAllSites(weeklyDate, todayDate, 0).subscribe((response: any) => {
          this.page = event;
          this.sites = response.data;
        });
      }
      else if (event.target.value == 2) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var todayDate = `${yyyy}-${mm}-${dd}`;
        var date = new Date();
        var dd = String(today.getDate() - 30).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var monthlyDate = `${yyyy}-${mm}-${dd}`;
        this.SiteService.getAllSites(monthlyDate, todayDate, 0).subscribe((response: any) => {
          this.page = event;
          this.sites = response.data;
        });
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  onChangeStatus(events: any) {
    try {
      if (events.target.value == 0) {
        this.getSites()
      }
      else if (events.target.value == 1) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var todayDate = `${yyyy}-${mm}-${dd}`;
        var date = new Date();
        var dd = String(today.getDate() - 7).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var weeklyDate = `${yyyy}-${mm}-${dd}`;
        this.SiteService.getAllSites('2023-05-01', todayDate, 1).subscribe((response: any) => {
          this.sites = response.data;
        });
      }
      else if (events.target.value == 2) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var todayDate = `${yyyy}-${mm}-${dd}`;
        var date = new Date();
        var dd = String(today.getDate() - 30).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var monthlyDate = `${yyyy}-${mm}-${dd}`;
        this.SiteService.getAllSites('2023-05-01', todayDate, 2).subscribe((response: any) => {
          this.sites = response.data;
        });
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getSites();
  }
}
