import { Component, OnInit } from '@angular/core';
import {firstValueFrom} from "rxjs";
import {BrandService} from "../../services/brand/brand.service";
import {Option} from "../../../types/Option";

@Component({
  selector: 'app-get-brands',
  templateUrl: './get-brands.component.html',
  styleUrls: ['./get-brands.component.scss']
})
export class GetBrandsComponent implements OnInit {

  private readonly token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3MjkzOTM0MTEsImV4cCI6MTczMTk4NTQxMX0.cQDOqMKqfvsfGdxsI74CJLdbHrCG_xTDkat9uNWxbhk";

  brandData: any[] = [];

  page: number = 0;
  size: number = 5;
  totalElements: number = 0;
  totalPages: number = 0;
  ascending: boolean = true;

  orderOptions: Option[] = [
    { name: '↑ Ascendente', value: true },
    { name: '↓ Descendente', value: false },
  ];


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

      }
    } catch (error) {
      console.error('Error al obtener brands:', error);

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
