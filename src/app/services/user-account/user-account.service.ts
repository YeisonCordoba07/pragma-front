import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {TOKEN, USER_CREATION_URL} from "../../constants/service.constants";
import {UserAccountModel} from "../../../types/user-account.model";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {


  constructor(private readonly http: HttpClient) { }


  createUser(newUser: {
    name: string;
    lastName: string,
    identityDocument: number,
    phone: string,
    birthDate: string;
    email: string,
    password: string,
    role: string,
  }): Observable<HttpResponse<UserAccountModel>> {

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      }
    );

    return this.http.post<UserAccountModel>(USER_CREATION_URL, newUser, {
      headers,
      observe: "response"
    });
  }

}
