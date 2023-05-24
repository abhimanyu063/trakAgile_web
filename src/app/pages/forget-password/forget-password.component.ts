import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ForgetPasswordService } from 'src/app/services/forgetpassword.services';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  userForgetPasswordForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private forgetPasswordServie: ForgetPasswordService, private formGroup: FormBuilder, private matsnack: MatSnackBar) {


  }
  ngOnInit(): void {
    this.userForgetPasswordForm = this.formGroup.group({
      userName: ['', Validators.required],
    });
  }

  async onSubmitForgetPassword() {
    if (!this.userForgetPasswordForm.invalid) {
      let result = await this.forgetPasswordServie.onSubmitForgetPassword(this.userForgetPasswordForm.value.userName.trim()).toPromise();
      this.matsnack.open("Password has been sent to your email " + result.data.email + ".", 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
      this.userForgetPasswordForm.reset();
    }
    else {
      this.matsnack.open("UserName / email or mobile is required.", 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
    }
  }
}

