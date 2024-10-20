import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryService} from "../../services/category/category.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-get-categories',
  templateUrl: './get-categories.component.html',
  styleUrls: ['./get-categories.component.scss']
})
export class GetCategoriesComponent implements OnInit {
  private readonly token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3MjkzOTM0MTEsImV4cCI6MTczMTk4NTQxMX0.cQDOqMKqfvsfGdxsI74CJLdbHrCG_xTDkat9uNWxbhk";

  categoryData: any[] = [];

  page: number = 0;
  size: number = 5;
  totalElements: number = 0;
  totalPages: number = 0;
  ascending: boolean = true;


  constructor(private readonly categoryService: CategoryService) { }


  ngOnInit(): void {
    this.loadCategories();
  }
  // GET REQUEST
  async loadCategories(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.categoryService.getCategories(
          this.page, this.size, this.token, this.ascending)
      );

      if (response) {
        this.categoryData = response.content;
        this.page = response.page;
        this.size = response.size;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;

      } else {
        console.error('No se recibieron datos de la API.');

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
