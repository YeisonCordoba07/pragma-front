import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {BRAND_CREATION_URL, TOKEN} from "../../constants/service.constants";
import {BrandModel, BrandResponse} from "../../../types/brand.model";

@Injectable({
  providedIn: 'root'
})
export class BrandService {


  constructor(private readonly http: HttpClient) { }


  getBrand(page: number, size: number, ascending: boolean): Observable<BrandResponse> {
    const url = `http://localhost:8080/brand/getAll?page=${page}&size=${size}&sortBy=name&ascending=${ascending}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${TOKEN}`
    });
    return this.http.get<BrandResponse>(url, { headers });
  }


  createBrand(brand: { name: string; description: string }): Observable<HttpResponse<BrandModel>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`}
    );

    return this.http.post<BrandModel>(BRAND_CREATION_URL, brand, {
      headers,
      observe: "response"
    });
  }
}
