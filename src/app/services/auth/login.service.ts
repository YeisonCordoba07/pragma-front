import { Injectable } from '@angular/core';
import {LoginRequest, LoginResponse} from "../../../types/login";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginURL: string = "http://localhost:8090/auth/login";

  constructor(private readonly http: HttpClient) { }

  login2(credentials: LoginRequest): Observable<any>{
    console.log("CREDENCIAL SERVICE LOGIN: ", credentials);
    return this.http.post(this.loginURL, credentials);
  }


  login(credentials: LoginRequest): Observable<HttpResponse<LoginResponse>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<LoginResponse>(this.loginURL, credentials, {
      headers,
      observe: "response"
    });
  }
}
