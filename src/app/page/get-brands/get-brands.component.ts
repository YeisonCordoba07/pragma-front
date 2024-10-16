import { Component, OnInit } from '@angular/core';
import {firstValueFrom} from "rxjs";
import {BrandService} from "../../services/brand.service";

@Component({
  selector: 'app-get-brands',
  templateUrl: './get-brands.component.html',
  styleUrls: ['./get-brands.component.scss']
})
export class GetBrandsComponent implements OnInit {

  readonly token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3Mjg0MzU5NjUsImV4cCI6MTcyOTI5OTk2NX0.fgaWToNQjV4D6dOO529768D8g7MeZIa8PuIwmFdoPWE";

  brandData: any[] = [];

  page: number = 0;
  size: number = 5;
  totalElements: number = 0;
  totalPages: number = 0;
  ascending: boolean = true;


  constructor(private readonly brandService: BrandService) { }



  ngOnInit(): void {
    this.loadBrands();
  }


  // GET REQUEST
  async loadBrands(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.brandService.getBrand(
          this.page, this.size, this.token, this.ascending)
      );

      if (response) {
        this.brandData = response.content;
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
      this.loadBrands();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadBrands();
    }
  }

  changeAscending(): void{
    this.ascending = !this.ascending;
    this.loadBrands();
  }

}
