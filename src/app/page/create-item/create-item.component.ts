import {Component, OnInit} from '@angular/core';
import {firstValueFrom, lastValueFrom} from "rxjs";
import {ItemService} from "../../services/item/item.service";
import {CategoryService} from "../../services/category/category.service";
import {BrandService} from "../../services/brand/brand.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  showToast: boolean = false;
  toastMessage: string = '';
  typeToastMessage: "error" | "warning" | "success" | "neutral" = "neutral";

  categoryData: any[] = [];
  brandData: any[] = [];

  formItem!: FormGroup;

  maxLengthName: number = 50;
  maxLengthDescription: number = 120;




  constructor(private readonly itemService: ItemService,
              private readonly categoryService: CategoryService,
              private readonly brandService: BrandService, private readonly fb: FormBuilder) {

      this.formItem = this.fb.group({

        name: ['', [Validators.required, Validators.maxLength(this.maxLengthName)]],
        description: ['', [Validators.required, Validators.maxLength(this.maxLengthDescription)]],
        quantity: [0, [Validators.required, Validators.min(1)]],
        price: [0.0, [Validators.required, Validators.min(1.0)]],
        categories: [[], [Validators.required, this.minArrayLength(1), this.maxArrayLength(3)]],
        brandName: ['', [Validators.required]],
      })

  }

  // Validadores personalizados
  minArrayLength(min: number) {
    return (control: FormControl) => {
      const value = control.value;
      if (Array.isArray(value) && value.length >= min) {
        return null;
      }
      return { minlength: true };
    };
  }

  maxArrayLength(max: number) {
    return (control: FormControl) => {
      const value = control.value;
      if (Array.isArray(value) && value.length <= max) {
        return null;
      }
      return { maxlength: true };
    };
  }

  ngOnInit(): void {
    // No necessary
    this.loadCategories();
    this.loadBrands();

  }




  showCustomToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 5000); // Duración del toast
  }




  async createItem(formData: any) {

    const newItem = {
      name: formData.name,
      description: formData.description,
      quantity: formData.quantity,
      price: formData.price,
      categories: formData.categories,
      brandName: formData.brandName

    };

    // POST REQUEST TO CREATE CATEGORY
    try {
      const response = await lastValueFrom(
        this.itemService.createItem(newItem));

      if (response.status === 201) {

        this.typeToastMessage = "success";
        this.showCustomToast("Articulo creado exitosamente");

      }
    } catch (error) {

      this.typeToastMessage = "error";
      this.showCustomToast("Error al enviar la solicitud");
    }

  }




  // GET REQUEST
  async loadCategories(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.categoryService.getCategories(
          0, 100, true)
      );

      if (response) {
        this.categoryData = response.content;

      }
    } catch (error) {
      console.error('Error al obtener brands:', error);

    }
  }

  async loadBrands(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.brandService.getBrand(
          0, 100, true)
      );

      if (response) {
        this.brandData = response.content;

      }
    } catch (error) {
      console.error('Error al obtener brands:', error);

    }
  }




  // Getters
  get name() {
    return this.formItem.get('name') as FormControl;
  }

  get description() {
    return this.formItem.get('description') as FormControl;
  }

  get quantity(){
    return this.formItem.get('quantity') as FormControl;
  }

  get price(){
    return this.formItem.get('price') as FormControl;
  }

  get categories() {
    return this.formItem.get('categories') as FormControl;
  }

  get brandName() {
    return this.formItem.get('brandName') as FormControl;
  }


}
