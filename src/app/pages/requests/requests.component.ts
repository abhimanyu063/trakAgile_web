import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.services';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  requests: any = []
  fromDate:Date= new Date();
  toDate:Date= new Date();
  
  constructor(private requestService: RequestService, private datePipe:DatePipe) {

  }
  ngOnInit(): void {
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
}
