import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-get-categories',
  templateUrl: './get-categories.component.html',
  styleUrls: ['./get-categories.component.scss']
})
export class GetCategoriesComponent implements OnInit {
  private readonly token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3Mjg0MzU5NjUsImV4cCI6MTcyOTI5OTk2NX0.fgaWToNQjV4D6dOO529768D8g7MeZIa8PuIwmFdoPWE";

  categories: any[] = [];
  page: number = 0;
  size: number = 3;
  totalElements: number = 0;
  totalPages: number = 0;


  constructor(private readonly categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }


    // GET REQUEST
  loadCategories(): void {
    this.categoryService.getCategories2(this.page, this.size, this.token).subscribe(
      (response) => {
        this.categories = response.content;
        this.page = response.page;
        this.size = response.size;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error("Error al obtener las categorías:", error);
      }
    );
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

}
