import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.services';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { HeaderService } from 'src/app/services/header.services';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  requests: any = []
  fromDate:Date= new Date();
  toDate:Date= new Date();
  
  constructor(private requestService: RequestService, private datePipe:DatePipe, private headerService:HeaderService) {

  }
  ngOnInit(): void {
    this.headerService.setHeaderVisibility(true);
    this.fromDate.setDate( this.fromDate.getDate() -10 );
    this.getRequests();
  }
  getRequests() {
    this.requestService.getAllRequests(this.datePipe.transform(this.fromDate,'yyyy-MM-dd')?.toString(), this.datePipe.transform(this.toDate,'yyyy-MM-dd')?.toString()).subscribe((response: any) => {
      this.requests = response.data;
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
  onChange(event: any) {
    try {
      if (event.target.value == 0) {
        this.getRequests()
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
        this.requestService.getAllRequests(weeklyDate, todayDate).subscribe((response: any) => {
          this.requests = response.data;
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
        this.requestService.getAllRequests(monthlyDate, todayDate).subscribe((response: any) => {
          this.requests = response.data;
        });
      }
    }
    catch (error) {
      console.log(error);
    }
  }
}
