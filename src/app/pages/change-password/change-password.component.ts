import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HeaderService } from 'src/app/services/header.services';
import { ChangePasswordService } from 'src/app/services/changepassword.services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
changePasswordForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private ChangePasswordServices: ChangePasswordService, private formGroup: FormBuilder, private matsnack: MatSnackBar, private headerService: HeaderService) {


  }
  ngOnInit(): void {
    //this.headerService.setHeaderVisibility(false);
    this.changePasswordForm = this.formGroup.group({
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
  async onChangePassword() {
    if (!this.changePasswordForm.invalid) {
      let validateUserNameEmail = await this.ChangePasswordServices.onSaveUser(this.changePasswordForm.value).toPromise();
      
        this.matsnack.open("User registered successfully.", 'Dismiss', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000
        });
        this.changePasswordForm.reset();
    }
      
  }
}
