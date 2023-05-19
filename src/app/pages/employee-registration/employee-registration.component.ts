import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss']
})
export class EmployeeRegistrationComponent implements OnInit {
  userForm: FormGroup

  constructor(private userServie: UserService, private formGroup: FormBuilder) {


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
    let result = await this.userServie.onSaveUser(this.userForm.value).toPromise();
    console.log(result);
  }
}
