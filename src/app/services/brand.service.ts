import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private readonly getBrandURL = "http://localhost:8080/category/getAll?page=0&size=3&sortBy=name&ascending=true";
  private readonly createBrandURL = 'http://localhost:8080/category';

  constructor(private http: HttpClient) { }


  getBrand(page: number, size: number, token: string, ascending: boolean): Observable<any> {
    const url = `http://localhost:8080/brand/getAll?page=${page}&size=${size}&sortBy=name&ascending=${ascending}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(url, { headers });
  }


  createBrand(brand: { name: string; description: string }, token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`}
    );

    return this.http.post<any>(this.createBrandURL, brand, {
      headers,
      observe: "response"
    });
  }
}
