import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly getCategoriesURL = "http://localhost:8080/category/getAll?page=0&size=3&sortBy=name&ascending=true";
  private readonly createCategoryURL = 'http://localhost:8080/category';

  constructor(private http: HttpClient) { }


  getCategories(page: number, size: number, token: string): Observable<any> {
    const url = `http://localhost:8080/category/getAll?page=${page}&size=${size}&sortBy=name&ascending=true`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(url, { headers });
  }


  createCategory(category: { name: string; description: string }, token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`}
    );

    return this.http.post<any>(this.createCategoryURL, category, {
      headers,
      observe: "response"
    });
  }
}
