import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class DashboardService {
    constructor(private injector: Injector) {
    }
    getDashboardDetails(): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + `dashboard/getdashboarddetails`);
    }
}