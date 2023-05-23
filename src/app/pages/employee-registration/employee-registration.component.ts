import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HeaderService } from 'src/app/services/header.services';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss']
})
export class EmployeeRegistrationComponent implements OnInit {
  userForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private userServie: UserService, private formGroup: FormBuilder, private matsnack: MatSnackBar, private headerService: HeaderService) {


  }
  ngOnInit(): void {
    //this.headerService.setHeaderVisibility(false);
    this.userForm = this.formGroup.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      roleId: 2,
      isActive: 1
    });
  }
  async onSaveUser() {
    if (!this.userForm.invalid) {
      let validateUserNameEmail = await this.userServie.validateUserNameandEmail(this.userForm.value).toPromise();
      if (validateUserNameEmail.data == undefined) {
        let result = await this.userServie.onSaveUser(this.userForm.value).toPromise();
        this.matsnack.open("User registered successfully.", 'Dismiss', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000
        });
        this.userForm.reset();
      }
      else {
        if (validateUserNameEmail.data.userName == this.userForm.value.userName.trim()) {
          this.matsnack.open("This user name " + validateUserNameEmail.data.userName + " is already registered, Please try another user name.", 'Dismiss', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
          this.userForm.value.userName = [''];
        }
        else if (validateUserNameEmail.data.email == this.userForm.value.email.trim()) {
          this.matsnack.open("This email " + validateUserNameEmail.data.email + " is already registered, Please try another email.", 'Dismiss', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
          this.userForm.value.userName = [''];
        }
        else if (validateUserNameEmail.data.mobile == this.userForm.value.mobile.trim()) {
          this.matsnack.open("This mobile number " + validateUserNameEmail.data.mobile + " is already registered, Please try another mobile number.", 'Dismiss', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
          this.userForm.value.userName = [''];
        }
      }
    }
    else {
      this.matsnack.open("All fields are mandatory.", 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
    }
  }
}
