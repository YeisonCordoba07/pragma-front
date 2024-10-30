import {Component, OnInit} from '@angular/core';
import {CategoryService} from 'src/app/services/category/category.service';
import {lastValueFrom} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  showToast: boolean = false;
  toastMessage: string = '';
  typeToastMessage: "error" | "warning" | "success" | "neutral" = "neutral";

  formCategory: FormGroup;
  maxLengthName: number = 50;
  maxLengthDescription: number = 120;

  showCustomToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 5000); // Duración del toast
  }


  constructor(private readonly categoryService: CategoryService, private readonly fb: FormBuilder) {
    this.formCategory = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(this.maxLengthName)]],
      description: ['', [Validators.required, Validators.maxLength(this.maxLengthDescription)]],
    })
  }


  ngOnInit(): void {
    // No necessary
  }


  async createCategory(formData: any) {

    const newCategory = {
      name: formData.name,
      description: formData.description
    };


    // POST REQUEST TO CREATE CATEGORY
    try {
      const response = await lastValueFrom(
        this.categoryService.createCategory(newCategory));

      if (response.status === 201) {

        this.typeToastMessage = "success";
        this.showCustomToast("Categoría creada exitosamente");

      }
    } catch (error) {

      this.typeToastMessage = "error";
      this.showCustomToast("Error al enviar la solicitud");
    }

  }




  // Getters
  get name() {
    return this.formCategory.get('name') as FormControl;
  }

  get description() {
    return this.formCategory.get('description') as FormControl;
  }

}
