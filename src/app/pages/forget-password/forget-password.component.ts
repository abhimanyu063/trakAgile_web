import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ForgetPassword } from 'src/app/services/forgetpassword.services';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  userForgetPasswordForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private forgetPasswordServie: ForgetPassword, private formGroup: FormBuilder, private matsnack: MatSnackBar) {


  }
  ngOnInit(): void {
    this.userForgetPasswordForm = this.formGroup.group({
      email: ['', Validators.required],
    });
  }

  async onSubmitForgetPassword() {
    if (!this.userForgetPasswordForm.invalid) {
      let result = await this.forgetPasswordServie.onSubmitForgetPassword(this.userForgetPasswordForm.value).toPromise();
      this.matsnack.open("User registered successfully.", 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
      this.userForgetPasswordForm.reset();
    }
    else {
      this.matsnack.open("Email id is required.", 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
    }
  }
}

