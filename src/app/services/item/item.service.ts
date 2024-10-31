import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITEM_CREATION_URL, TOKEN} from "../../constants/service.constants";
import {ItemResponse} from "../../../types/item.model";


@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private readonly http: HttpClient) {
  }


  getItem(page: number, size: number, table: string, ascending: boolean): Observable<ItemResponse> {
    const url = `http://localhost:8080/item/getAll?page=${page}&size=${size}&sortBy=name&table=${table}&ascending=${ascending}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${TOKEN}`
    });
    return this.http.get<ItemResponse>(url, {headers});
  }




  createItem(item: {
    name: string;
    description: string,
    quantity: number,
    price: number,
    categories: string[];
    brandName: string
  }): Observable<HttpResponse<ItemResponse>> {

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      }
    );

    return this.http.post<ItemResponse>(ITEM_CREATION_URL, item, {
      headers,
      observe: "response"
    });
  }



}
