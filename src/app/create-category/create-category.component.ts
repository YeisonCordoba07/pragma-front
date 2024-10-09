import {Component, OnInit} from '@angular/core';
import {DataService} from 'src/app/services/data.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  category: any[] = [];
  private categoryName: string = "";
  private categoryDescription: string = '';  // Almacena el valor recibido del hijo
  private token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3Mjg0MzU5NjUsImV4cCI6MTcyOTI5OTk2NX0.fgaWToNQjV4D6dOO529768D8g7MeZIa8PuIwmFdoPWE";

  constructor(private dataService: DataService) {
  }


  ngOnInit(): void {
    this.dataService.getPosts(this.token).subscribe(
      (response) => {
        //this.category = response;
        console.log("DATA", response);
      },
      (error) => {
        console.log("ERROR GET CATEGORY", error);
      }
    );
  }


  receiveName(value: string) {
    this.categoryName = value;  // Actualiza el valor recibido
    console.log('Valor Name recibido del hijo:', value);
  }

  receiveDescription(value: string) {
    this.categoryDescription = value;  // Actualiza el valor recibido
    console.log('Valor Descripcion recibido del hijo:', value);
  }

  updateCategoryValues(type: 'name' | 'description', value: string) {
    if (type === 'name') {
      this.categoryName = value;
    } else {
      this.categoryDescription = value;
    }
    console.log(`Valor ${type} recibido del hijo:`, value);
  }


  createCategory() {
    const newCategory = {
      name: this.categoryName,
      description: this.categoryDescription
    };
    console.log("NOMBRE: ", newCategory.name);
    console.log("DESCRIPTION: ", newCategory.description);
/*
    this.dataService.createCategory(newCategory, this.token+"3").subscribe(
      response => {
        console.log('Categoría creada con éxito:', response);
      },
      error => {
        console.error('Error al crear la categoría:', error);
      }
    );*/
  }


}
