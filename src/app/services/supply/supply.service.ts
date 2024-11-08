import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Supply} from "../../../types/supply.model";
import {TOKEN} from "../../constants/service.constants";

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  constructor(private readonly http: HttpClient) { }

  addSupply(newSupply: {idItem: number; quantity: number;}): Observable<any> {

    const url = "http://localhost:8082/supply";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    });


    return this.http.post<Supply>(url, newSupply, {
      headers,
      observe: "response"
    })
  }
}
