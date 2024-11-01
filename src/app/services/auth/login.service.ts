import { Injectable } from '@angular/core';
import {LoginRequest, LoginResponse, LoginUserData} from "../../../types/login";
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {jwtDecode} from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentLoginData: BehaviorSubject<LoginUserData> = new BehaviorSubject<LoginUserData>(
    {
      email: "",
      role: "",
    }
  );


  loginURL: string = "http://localhost:8090/auth/login";

  constructor(private readonly http: HttpClient) { }

  login2(credentials: LoginRequest): Observable<any>{
    console.log("CREDENCIAL SERVICE LOGIN: ", credentials);
    return this.http.post(this.loginURL, credentials);
  }


  login(credentials: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<LoginResponse>(this.loginURL, credentials, {
      headers,
      observe: "body"
    }).pipe(
      tap((userLogin: LoginResponse) => {
        this.currentUserLoginOn.next(true);

        // Decodificar el token para extraer el correo y el rol
        const decodedToken: any = jwtDecode(userLogin.token);

        const email = decodedToken.sub;
        const role = decodedToken.roles;

        const tempUserLoginData = {
          email: email,
          role: role,
        }

        this.currentLoginData.next(tempUserLoginData);

      }),
    );
  }


  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get loginData(): Observable<LoginUserData>{
    return this.currentLoginData.asObservable();
  }
}
