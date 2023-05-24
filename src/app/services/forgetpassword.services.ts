import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class ForgetPasswordService {
    constructor(private injector: Injector) {
    }
    onSubmitForgetPassword(userName: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + `users/forgetPassword/${userName}`);
    }
}