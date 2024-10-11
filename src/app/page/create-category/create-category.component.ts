import {Component, OnInit} from '@angular/core';
import {CategoryService} from 'src/app/services/category.service';
import {lastValueFrom} from "rxjs";


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  public categoryName: string = "";
  public categoryDescription: string = "";
  private readonly token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3Mjg0MzU5NjUsImV4cCI6MTcyOTI5OTk2NX0.fgaWToNQjV4D6dOO529768D8g7MeZIa8PuIwmFdoPWE";

  public nameError: string = "";
  public descriptionError: string = "";
  public categoryStatus: string = "";


  constructor(private readonly categoryService: CategoryService) {
  }


  ngOnInit(): void {
    // No necessary
  }


  updateCategoryValues(type: "name" | "description", value: string) {
    if (type === "name") {
      if (value.length > 50) {
        this.nameError = "El nombre no puede tener más de 50 caracteres.";
      }
      else if(value.length === 0){
        this.nameError = "El nombre no puede estar vacio.";
      } else {
        this.nameError = "";
        this.categoryName = value;
      }
    } else if (type === "description") {
      if (value.length > 90) {
        this.descriptionError = "La descripción no puede tener más de 90 caracteres.";
      }else if(value.length === 0){
        this.nameError = "La descripción no puede estar vacio.";
      }  else {
        this.descriptionError = "";
        this.categoryDescription = value;
      }
    }
  }


  async createCategory() {
    if (!this.nameError && !this.descriptionError) {
      const newCategory = {
        name: this.categoryName,
        description: this.categoryDescription
      };


      // POST REQUEST TO CREATE CATEGORY
      try {
        // POST REQUEST TO CREATE CATEGORY USING async/await
        const response = await lastValueFrom(
          this.categoryService.createCategory(newCategory, this.token));

        if (response.status === 201) {
          this.categoryStatus = "Categoria creada exitosamente";
        } else {
          this.categoryStatus = "... al crear categoria";
        }
      } catch (error) {
        this.categoryStatus = "Error al enviar la solicitud";
      }
    }
  }
}
