import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.services';
import { SiteService } from 'src/app/services/site.services';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/services/shared.service';

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
  image: any;
  supervisorId: Number = 0;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private SiteService: SiteService,private sharedService: SharedService, private headerService: HeaderService, private datePipe: DatePipe, private sanitizer: DomSanitizer, public dialogRef: MatDialog, private matsnack: MatSnackBar) {

  }
  ngOnInit(): void {
    this.headerService.setHeaderVisibility(true);
    this.fromDate.setDate(this.fromDate.getDate() - 10);
    this.toDate.setDate(this.toDate.getDate() - 10);
    this.supervisorId = this.sharedService.getUserId();
    this.getSites();
  }
  openDialog(siteWorkId: number) {
    this.image = "";

    this.SiteService.getImage(siteWorkId).subscribe((response: any) => {
      if (response.success) {
        const b64Data = btoa(String.fromCharCode.apply(null, response.data));
        this.image = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + b64Data);
        const siteName = this.sites.find((x: any) => x.siteWorkId == siteWorkId).siteName;
        this.dialogRef.open(PopupComponent, {
          data: { image: this.image, siteName: siteName },
        });
      }
    });
  }

  getSites() {
    try {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      var todayDate = `${yyyy}-${mm}-${dd}`;
      this.SiteService.getAllSites('2023-05-01', todayDate, 0, this.supervisorId).subscribe((response: any) => {
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
      this.SiteService.getAllSites(this.fromDate, this.toDate, 0, this.supervisorId).subscribe((response: any) => {
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
        this.SiteService.getAllSites(weeklyDate, todayDate, 0, this.supervisorId).subscribe((response: any) => {
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
        this.SiteService.getAllSites(monthlyDate, todayDate, 0, this.supervisorId).subscribe((response: any) => {
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
        this.SiteService.getAllSites('2023-05-01', todayDate, 1, this.supervisorId).subscribe((response: any) => {
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
        this.SiteService.getAllSites('2023-05-01', todayDate, 2, this.supervisorId).subscribe((response: any) => {
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
