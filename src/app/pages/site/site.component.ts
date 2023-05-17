import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.services';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  sites: any = [];
  constructor(private siteService: SiteService) {

  }
  ngOnInit(): void {
    this.getSites();
  }
  getSites() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var todayDate = `${yyyy}-${mm}-${dd}`;
    this.siteService.getAllSites('2023-05-01', todayDate).subscribe((response: any) => {
      this.sites = response.data;
    });
  }
}
