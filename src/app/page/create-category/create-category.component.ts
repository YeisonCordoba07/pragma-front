import {Component, OnInit} from '@angular/core';
import {CategoryService} from 'src/app/services/category/category.service';
import {lastValueFrom} from "rxjs";


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  private readonly token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3MjkzOTM0MTEsImV4cCI6MTczMTk4NTQxMX0.cQDOqMKqfvsfGdxsI74CJLdbHrCG_xTDkat9uNWxbhk";

  showToast: boolean = false;
  toastMessage: string = '';
  typeToastMessage: "error" | "warning" | "success" | "neutral" = "neutral";


  showCustomToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 5000); // Duración del toast
  }


  constructor(private readonly categoryService: CategoryService) {
  }


  ngOnInit(): void {
    // No necessary
  }


  async createCategory(formFata: any) {


    console.log("ENVIO: ", formFata);

    const newCategory = {
      name: formFata.name,
      description: formFata.description
    };


    // POST REQUEST TO CREATE CATEGORY
    try {
      const response = await lastValueFrom(
        this.categoryService.createCategory(newCategory, this.token));

      if (response.status === 201) {

        this.typeToastMessage = "success";
        this.showCustomToast("Categoría creada exitosamente");

      } else {

      }
    } catch (error) {

      this.typeToastMessage = "error";
      this.showCustomToast("Error al enviar la solicitud");
    }

  }


}
