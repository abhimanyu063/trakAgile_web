import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class UserService {
    constructor(private injector: Injector) {
    }
    onSaveUser(userData: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + `users/adduser`, userData);
    }
    onValidateAdmin(userData: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + `users/validateAdminAndGetDetails`, userData);
    }
    validateUserNameandEmail(userData: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + `users/validateUserNameEmailAndMobile`, userData);
    }
    getAllUsers(): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + `users/getUsers`);
    }
    getOnlineUsers(): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + `users/getOnlineUsers`);
    }
    getSupervisor(): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + `users/getSupervisor`);
    }
}