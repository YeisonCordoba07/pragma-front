import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/auth/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  formLogin: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly loginService: LoginService, private router: Router) {
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
        console.log(userToken.token);
        console.log(userToken.role);
      },
      error: (errorData) =>{
        console.log(errorData);
      },
      complete: () =>{
        console.info("Login completo");
        this.router.navigateByUrl('/');
        this.formLogin.reset();

      }

    })


  }

  // Getters
  get email() {
    return this.formLogin.get('email') as FormControl;
  }

  get password() {
    return this.formLogin.get('password') as FormControl;
  }
}
