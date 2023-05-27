import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class SiteService {
    constructor(private injector: Injector) {
    }
    addSite(data: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + "sites/addSite", data).toPromise();
    }
    getSites(userId: Number): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + "sites/getSitesByUserId/" + userId + "");
    }
    getAllSites(startDate: any, endDate: any, status: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + `sites/getSites/${startDate}/${endDate}/${status}`);
    }
    getAllSiteReportedIsuue(): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + `users/getSiteReportedIssueDetails`);
    }
}