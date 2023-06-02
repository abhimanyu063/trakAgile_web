export class SharedService {
    public setUserName(userName: string) {
        localStorage.setItem("userName", userName);
    }
    public getUserName() {
        localStorage.getItem("userName");
    }
    public setUserId(userId: any) {
        localStorage.setItem("userId", userId);
    }
    public setLoginUserId(supervisorId: any) {
        localStorage.setItem("supervisorId", supervisorId);
    }
    public getLoginUserId() : any {
        return localStorage.getItem("supervisorId");
    }
    public getUserId(): any {
        return localStorage.getItem("userId");
    }
    public setName(name: any) {
        localStorage.setItem("name", name);
    }
    public getName(): any {
        return localStorage.getItem("name");
    }
    public setEmail(email: any) {
        localStorage.setItem("email", email);
    }
    public getEmail(): any {
        return localStorage.getItem("email");
    }
    public clearLocalStorage(): any {
        this.setUserId('');
        this.setUserName('');
        this.setName('');
        this.setEmail('');
    }
}