import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class ChangePasswordService {
    constructor(private injector: Injector) {
    }
    onChangePassword(userData: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + `users/changePassword`, userData);
    }
}