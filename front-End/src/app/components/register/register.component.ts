import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Spacevalidator } from 'src/app/model/spacevalidator';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  logInFormGroup: FormGroup;
  invalidMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.logInFormGroup = this.formBuilder.group({
      admin: this.formBuilder.group({
        userName: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Spacevalidator.noOnlyWithSpace,
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
      }),
    });
  }

  get userName() {
    return this.logInFormGroup.get('admin.userName')?.value;
  }
  get password() {
    return this.logInFormGroup.get('admin.password')?.value;
  }

  OnSubmit() {
    if (this.logInFormGroup.invalid) {
      this.logInFormGroup.markAllAsTouched();
    } else {
      this.auth.executeAuthentication(this.userName, this.password).subscribe(
        (data) => {
          console.log(data.message);
          this.route.navigateByUrl('students');
        },
        (error) => {
          this.invalidMessage = 'Invalid UserName and Password';
          this.showMessage();
        }
      );

      // const result = this.loginService.Login(this.userName?.value, this.password?.value)
      // if (result == true) {
      //   this.route.navigateByUrl('students');
      // } else {
      //   this.invalidMessage = "Invalid Username or Password";
      //   this.showMessage()
      // }
    }

    // console.log(this.userName?.value)
    // console.log(this.password?.value)
  }

  showMessage() {
    setTimeout(() => {
      this.invalidMessage = '';
    }, 3000);
  }
}
