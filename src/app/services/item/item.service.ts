import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  private readonly createItemURL = 'http://localhost:8080/item';
  private readonly token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3MjkzOTM0MTEsImV4cCI6MTczMTk4NTQxMX0.cQDOqMKqfvsfGdxsI74CJLdbHrCG_xTDkat9uNWxbhk";

  constructor(private readonly http: HttpClient) {
  }


  getItem(page: number, size: number, table: string, ascending: boolean): Observable<any> {
    const url = `http://localhost:8080/item/getAll?page=${page}&size=${size}&sortBy=name&table=${table}&ascending=${ascending}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(url, {headers});
  }




  createItem(item: {
    name: string;
    description: string,
    quantity: number,
    price: number,
    categories: string[];
    brandName: string
  }, token: string): Observable<any> {

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    );

    return this.http.post<any>(this.createItemURL, item, {
      headers,
      observe: "response"
    });
  }



}
