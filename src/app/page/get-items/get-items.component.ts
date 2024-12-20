import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item/item.service";
import {firstValueFrom} from "rxjs";
import {Option} from "../../../types/Option";
import {ItemModel} from "../../../types/item.model";

@Component({
  selector: 'app-get-items',
  templateUrl: './get-items.component.html',
  styleUrls: ['./get-items.component.scss']
})
export class GetItemsComponent implements OnInit {
  itemData: ItemModel[] = [];

  page: number = 0;
  size: number = 5;
  totalElements: number = 0;
  totalPages: number = 0;
  ascending: boolean = true;
  orderBy: string = "itemEntity";

  dataOptions: Option[] = [
    { name: 'Item', value: 'itemEntity' },
    { name: 'Brand', value: 'brand' },
    { name: 'Category', value: 'category' }
  ];

  orderOptions: Option[] = [
    { name: '↑ Ascendente', value: true },
    { name: '↓ Descendente', value: false },
  ];


  constructor(private readonly itemService: ItemService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  // GET REQUEST
  async loadItems(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.itemService.getItem(
          this.page, this.size, this.orderBy, this.ascending)
      );

      if (response) {
        this.itemData = response.content;
        this.page = response.page;
        this.size = response.size;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;

      }
    } catch (error) {
      console.error('Error al obtener articulos:', error);

    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadItems();
    }
  }


  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadItems();
    }
  }


  changeAscending(): void{
    this.ascending = !this.ascending;
    console.log("cambio");
    this.loadItems();
  }

  changeAscending2(orderBy: string) {
    this.orderBy = orderBy;
    this.loadItems();
  }
}
