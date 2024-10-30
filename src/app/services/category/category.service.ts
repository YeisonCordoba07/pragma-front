import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {CATEGORY_CREATION_URL, TOKEN} from "../../constants/service.constants";
import {CategoryModel, CategoryResponse} from "../../../types/category.model";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private readonly http: HttpClient) { }


  getCategories(page: number, size: number, ascending: boolean): Observable<CategoryResponse> {
    const url = `http://localhost:8080/category/getAll?page=${page}&size=${size}&sortBy=name&ascending=${ascending}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${TOKEN}`
    });
    return this.http.get<CategoryResponse>(url, { headers });
  }

  createCategory(category: { name: string; description: string }): Observable<HttpResponse<CategoryModel>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    });

    return this.http.post<CategoryModel>(CATEGORY_CREATION_URL, category, {
      headers,
      observe: "response"
    });
  }
}
