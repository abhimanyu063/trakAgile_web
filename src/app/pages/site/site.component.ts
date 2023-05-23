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
  fromDate:Date= new Date();
  toDate:Date= new Date();
  constructor(private SiteService: SiteService, private headerService:HeaderService, private datePipe:DatePipe) {

  }
  ngOnInit(): void {
    this.headerService.setHeaderVisibility(true);
    this.fromDate.setDate( this.fromDate.getDate() -10 );
    this.getSites();
  }
  getRequests() {
    this.SiteService.getAllSites(this.datePipe.transform(this.fromDate,'yyyy-MM-dd')?.toString(), this.datePipe.transform(this.toDate,'yyyy-MM-dd')?.toString()).subscribe((response: any) => {
      this.requests = response.data;
    });
  }
  getSites() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var todayDate = `${yyyy}-${mm}-${dd}`;
    this.SiteService.getAllSites('2023-05-01', todayDate).subscribe((response: any) => {
      this.sites = response.data;
    });
  }
  public openPDF(): void {
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
  onRefreshRequests()
  {
    console.log(this.fromDate);
    this.getRequests();
  }
  
}
