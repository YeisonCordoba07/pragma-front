import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/auth/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  formLogin: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly loginService: LoginService) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  login(formData: any) {

    const dataLogin = {
      email: formData.email,
      password: formData.password
    };

    this.loginService.login(dataLogin).subscribe({
      next: (userToken) =>{
        console.log(userToken.body?.token);
        console.log(userToken.body?.role);
      },
      error: (errorData) =>{
        console.log(errorData);
      },
      complete: () =>{
        console.info("Login completo");
      }

    })

    console.log("VALORES LOGIN: ", this.formLogin.value);
    console.log("VALORES FORM: ", dataLogin);

  }

  // Getters
  get email() {
    return this.formLogin.get('email') as FormControl;
  }

  get password() {
    return this.formLogin.get('password') as FormControl;
  }
}
