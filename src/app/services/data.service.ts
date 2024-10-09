import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private getCategoriesURL = "http://localhost:8080/category/getAll?page=0&size=3&sortBy=name&ascending=true";
  private createCategoryURL = 'http://localhost:8080/category';

  constructor(private http: HttpClient) { }


  getPosts(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Encabezado Authorization con el token
    });
    return this.http.get<any>(this.getCategoriesURL, {headers});
  }

  createCategory(category: { name: string; description: string }, token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`}
    );

    return this.http.post<any>(this.createCategoryURL, category, { headers });
  }
}
