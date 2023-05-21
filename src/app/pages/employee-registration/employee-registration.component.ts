import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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

  constructor(private userServie: UserService, private formGroup: FormBuilder, private matsnack: MatSnackBar) {


  }
  ngOnInit(): void {
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
      let result = await this.userServie.onSaveUser(this.userForm.value).toPromise();
      this.matsnack.open("User registered successfully.", 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
      this.userForm.reset();
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
