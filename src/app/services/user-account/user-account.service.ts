import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private readonly createUserURL = 'http://localhost:8090/user/create';
  private readonly token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3MjkzOTM0MTEsImV4cCI6MTczMTk4NTQxMX0.cQDOqMKqfvsfGdxsI74CJLdbHrCG_xTDkat9uNWxbhk";


  constructor(private readonly http: HttpClient) { }


  createUser(newUser: {
    name: string;
    lastName: string,
    documentId: number,
    phone: string,
    birthDate: string;
    email: string,
    password: string,
  }): Observable<any> {

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    );

    return this.http.post<any>(this.createUserURL, newUser, {
      headers,
      observe: "response"
    });
  }

}
