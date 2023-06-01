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
  supervisors: any = [];
  supervisorId: number = 0;
  supervisor: any = [];
  role: any = [];
  roleId: number = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private userServie: UserService, private formGroup: FormBuilder, private matsnack: MatSnackBar, private headerService: HeaderService) {
    this.getSupervisor();
  }
  ngOnInit(): void {
    //this.headerService.setHeaderVisibility(false);
    this.userForm = this.formGroup.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]*$"), 
      Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      roleId: [0, Validators.required],
      supervisorId: [0, Validators.required],
      isActive: 1,
    });
  }
  get mob() { return this.userForm.controls };
  async onSaveUser() {
    console.log(this.userForm);
    if (!this.userForm.invalid) {
      let validateUserNameEmail = await this.userServie.validateUserNameandEmail(this.userForm.value).toPromise();
      if (validateUserNameEmail.data == undefined) {
        let result = await this.userServie.onSaveUser(this.userForm.value).toPromise();
        this.matsnack.open("User registered successfully.", 'Dismiss', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000
        });
        this.clearForm()
      }
      else {
        if (validateUserNameEmail.data.userName.trim() == this.userForm.value.userName.trim()) {
          this.matsnack.open("This user name " + validateUserNameEmail.data.userName + " is already registered, Please try another user name.", 'Dismiss', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
          this.userForm.get('userName')?.reset();
        }
        else if (validateUserNameEmail.data.email.trim() == this.userForm.value.email.trim()) {
          this.matsnack.open("This email " + validateUserNameEmail.data.email + " is already registered, Please try another email.", 'Dismiss', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
          this.userForm.get('email')?.reset();
        }
        else if (validateUserNameEmail.data.mobile.trim() == this.userForm.value.mobile.trim()) {
          this.matsnack.open("This mobile number " + validateUserNameEmail.data.mobile + " is already registered, Please try another mobile number.", 'Dismiss', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
          this.userForm.get('mobile')?.reset();
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
  async getSupervisor() {
    try {
      let result = await this.userServie.getSupervisor().toPromise();
      this.supervisors = result.data;
    }
    catch (error) {
      console.log(error);
    }
  }
  selectSupervisor(supervisor: any) {
    this.supervisorId = supervisor.target.value;
    console.log(this.supervisorId);
    this.userForm.value.supervisorId = supervisor.target.value;
  }
  selectRole(role: any) {
    this.roleId = role.target.value;
    console.log('role',this.roleId);
    this.userForm.value.roleId = role.target.value;
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  clearForm(){
    this.userForm.get('userName')?.reset();
    this.userForm.get('password')?.reset();
    this.userForm.get('name')?.reset();
    this.userForm.get('email')?.reset();
    this.userForm.get('mobile')?.reset();
    this.userForm.get('address')?.reset(); 
    this.userForm.get('city')?.reset();
    this.userForm.get('state')?.reset(); 
    this.userForm.get('country')?.reset();
    this.userForm.get('roleId')?.reset(0);
    this.userForm.get('supervisorId')?.reset(0);
  }
}
