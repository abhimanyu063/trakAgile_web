import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class ForgetPasswordService {
    constructor(private injector: Injector) {
    }
    onSubmitForgetPassword(userForgetPasswordData:any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + `users/validateForgetPassword`, userForgetPasswordData);
    }
}