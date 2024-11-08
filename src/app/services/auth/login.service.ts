import {Injectable} from '@angular/core';
import {LoginRequest, LoginResponse, LoginUserData} from "../../../types/login";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {jwtDecode} from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserIsLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentLoginData: BehaviorSubject<LoginUserData> = new BehaviorSubject<LoginUserData>(
    {
      email: "",
      role: "",
    }
  );


  loginURL: string = "http://localhost:8090/auth/login";

  constructor(private readonly http: HttpClient) { }


  login(credentials: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<LoginResponse>(this.loginURL, credentials, {
      headers,
      observe: "body"
    }).pipe(
      tap((userLogin: LoginResponse) => {
        // Verificar que el userLogin sea valido antes de actualizar currenUserIslogin
        this.currentUserIsLogin.next(true);
        this.currentLoginData.next(this.extractTokenData(userLogin.token));
        localStorage.setItem("token", userLogin.token);

      }),
    );
  }

  private extractTokenData(token: string | null): LoginUserData{
    const decodedToken: any = token ? jwtDecode(token) : null;

    return {
      email: decodedToken?.sub || "",
      role: decodedToken?.roles || "",
    };
  }

  isTokenExpired(token: string | null): boolean {
    if (!token) {
      return true;
    }

    const decodedToken: any = jwtDecode(token);
    const expiration = decodedToken.exp ? decodedToken.exp * 1000 : 0;
    return Date.now() > expiration;
  }


  logout():void{
    localStorage.removeItem("token");
    this.currentUserIsLogin.next(false);
    this.currentLoginData.next({email: "", role: ""});
  }

  getSessionToken(): boolean {
    const token: string | null = localStorage.getItem("token");

    if(token && !this.isTokenExpired(token)){
      this.currentLoginData.next(this.extractTokenData(token));
      this.currentUserIsLogin.next(true);
      return true;
    }
    this.logout();
    return false;

  }


  get userIsLogin(): Observable<boolean>{
    return this.currentUserIsLogin.asObservable();
  }

  get loginData(): Observable<LoginUserData>{
    return this.currentLoginData.asObservable();
  }
}
