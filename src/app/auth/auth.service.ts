import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { UserService } from '../services/user.services';
import { SharedService } from 'src/app/services/shared.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AppConfig } from '../appconfig';


@Injectable()
export class AuthService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userId: Number = 0;
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router, private userService: UserService, private sharedService: SharedService, private matsnack: MatSnackBar
  ) { }
  async login(user: User) {
    let result = await this.userService.onValidateAdmin(user).toPromise();
    if (result.success) {
      this.sharedService.setUserId(result.data.userId);
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
    else {
      this.matsnack.open("User Name or Password is invalid", 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: AppConfig.alertDuration
      });
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}