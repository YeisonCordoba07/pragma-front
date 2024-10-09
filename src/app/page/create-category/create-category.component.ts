import {Component, OnInit} from '@angular/core';
import {CategoryService} from 'src/app/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  private categoryName: string = "";
  private categoryDescription: string = "";
  private token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3Mjg0MzU5NjUsImV4cCI6MTcyOTI5OTk2NX0.fgaWToNQjV4D6dOO529768D8g7MeZIa8PuIwmFdoPWE";

  public nameError: string = "";
  public descriptionError: string = "";


  constructor(private dataService: CategoryService) {
  }


  ngOnInit(): void {

    // SOLICITUD GET
    /*this.dataService.getPosts(this.token).subscribe(
      (response) => {
        console.log("DATA", response);
      },
      (error) => {
        console.log("ERROR GET CATEGORY", error);
      }
    );*/
  }


  updateCategoryValues(type: "name" | "description", value: string) {
    if (type === "name") {
      if (value.length > 50) {
        this.nameError = "El nombre no puede tener más de 50 caracteres.";
      } else {
        this.nameError = "";
        this.categoryName = value;
      }
    } else if (type === "description") {
      if (value.length > 90) {
        this.descriptionError = "La descripción no puede tener más de 90 caracteres.";
      } else {
        this.descriptionError = "";
        this.categoryDescription = value;
      }
    }
  }


  createCategory() {
    if (!this.nameError && !this.descriptionError) {
      const newCategory = {
        name: this.categoryName,
        description: this.categoryDescription
      };
      console.log("NOMBRE: ", newCategory.name);
      console.log("DESCRIPTION: ", newCategory.description);

      // POST REQUEST TO CREATE CATEGORY
      this.dataService.createCategory(newCategory, this.token).subscribe(
        response => {
          console.log("Categoría creada con éxito:", response);
        },
        error => {
          console.error("Error al crear la categoría:", error);
        }
      );
    }

  }
}
