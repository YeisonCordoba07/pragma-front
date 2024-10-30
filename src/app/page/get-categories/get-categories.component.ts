import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category/category.service";
import {firstValueFrom} from "rxjs";
import {Option} from "../../../types/Option";

@Component({
  selector: 'app-get-categories',
  templateUrl: './get-categories.component.html',
  styleUrls: ['./get-categories.component.scss']
})
export class GetCategoriesComponent implements OnInit {

  categoryData: any[] = [];

  page: number = 0;
  size: number = 5;
  totalElements: number = 0;
  totalPages: number = 0;
  ascending: boolean = true;

  orderOptions: Option[] = [
    { name: '↑ Ascendente', value: true },
    { name: '↓ Descendente', value: false },
  ];

  constructor(private readonly categoryService: CategoryService) { }


  ngOnInit(): void {
    this.loadCategories();
  }




  // GET REQUEST
  async loadCategories(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.categoryService.getCategories(
          this.page, this.size, this.ascending)
      );

      if (response) {
        this.categoryData = response.content;
        this.page = response.page;
        this.size = response.size;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;

      }
    } catch (error) {
      console.error('Error al obtener las categorías:', error);

    }
  }


  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadCategories();
    }
  }


  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadCategories();
    }
  }


  changeAscending(): void{
    this.ascending = !this.ascending;
    this.loadCategories();
  }

}
