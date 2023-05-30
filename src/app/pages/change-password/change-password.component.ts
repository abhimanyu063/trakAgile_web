import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HeaderService } from 'src/app/services/header.services';
import { ChangePasswordService } from 'src/app/services/changepassword.services';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    changePasswordForm: FormGroup;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    userId: Number;
    //responses: any[];

    constructor(private ChangePasswordServices: ChangePasswordService, private router: Router, private formGroup: FormBuilder, private sharedService: SharedService, private matsnack: MatSnackBar, private headerService: HeaderService, private formBuilder: FormBuilder) {
    }
    ngOnInit(): void {
        this.userId = Number(this.sharedService.getUserId());
        this.changePasswordForm = this.formGroup.group({
            userId: this.userId,
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            roleId: 2,
            isActive: 1
        });
    }
    async onChangePassword() {
        let payload = {
            userId: this.userId,
            oldPassword: this.changePasswordForm.value.oldPassword.trim(),
            newPassword: this.changePasswordForm.value.newPassword.trim()
        }
        if (payload.oldPassword !== "" && payload.newPassword !== "" && this.changePasswordForm.value.confirmPassword.trim() !== "") {
            if (payload.newPassword === this.changePasswordForm.value.confirmPassword.trim()) {
                const response = await this.ChangePasswordServices.changePassword(payload).subscribe((response: any) => {
                    if (response.success) {
                        this.matsnack.open("Password has been changed successfully.", 'Dismiss', {
                            horizontalPosition: this.horizontalPosition,
                            verticalPosition: this.verticalPosition,
                            duration: 5000
                        });
                        this.router.navigate(['/login']);
                    }
                    else {
                        this.matsnack.open("Old password is incorrect.", 'Dismiss', {
                            horizontalPosition: this.horizontalPosition,
                            verticalPosition: this.verticalPosition,
                            duration: 5000
                        });
                        this.changePasswordForm.reset();
                    }
                });
            }
            else {
                this.matsnack.open("New password and Confirm password does not match.", 'Dismiss', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 5000
                });
                this.changePasswordForm.reset();
            }
        }
        else {
            this.matsnack.open("All fields are mandatory.", 'Dismiss', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
            });
            this.changePasswordForm.reset();
        }
    }
}


