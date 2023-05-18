import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalRequests:Number
  ngOnInit(): void {
    this.getTotalRequests();
  }

  getTotalRequests()
  {
    this.totalRequests=200;
  }
}
