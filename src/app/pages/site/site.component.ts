import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.services';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  sites:any=[];
  constructor(private siteService:SiteService)
  {

  }
  ngOnInit(): void {
    this.getSites();
  }
  getSites()
  {
    this.siteService.getAllSites('2023-05-01','2023-05-15').subscribe((response:any)=>{
      this.sites=response.data;
    });
  }
}
