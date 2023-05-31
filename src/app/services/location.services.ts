import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class LocationService
{
    constructor(private injector: Injector) {

    }
    getEmployeeTravelLocation(userId:any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + `sites/getlocation/${userId}`);
    }
}