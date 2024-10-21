import {Component, OnInit} from '@angular/core';
import {firstValueFrom, lastValueFrom} from "rxjs";
import {ItemService} from "../../services/item/item.service";
import {CategoryService} from "../../services/category/category.service";
import {BrandService} from "../../services/brand/brand.service";


@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  readonly token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3MjkzOTM0MTEsImV4cCI6MTczMTk4NTQxMX0.cQDOqMKqfvsfGdxsI74CJLdbHrCG_xTDkat9uNWxbhk";

  showToast: boolean = false;
  toastMessage: string = '';
  typeToastMessage: "error" | "warning" | "success" | "neutral" = "neutral";

  categoryData: any[] = [];
  brandData: any[] = [];




  constructor(private readonly itemService: ItemService,
              private readonly categoryService: CategoryService,
              private readonly brandService: BrandService) {
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
      categories: formData.categories, // Las categorías seleccionadas
      brandName: formData.brandName

    };

    // POST REQUEST TO CREATE CATEGORY
    try {
      const response = await lastValueFrom(
        this.itemService.createItem(newItem, this.token));

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
          0, 100, this.token, true)
      );

      if (response) {
        this.categoryData = response.content;

      } else {
        console.error('No se recibieron datos de categorias de la API.');

      }
    } catch (error) {
      console.error('Error al obtener brands:', error);

    }
  }

  async loadBrands(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.brandService.getBrand(
          0, 100, this.token, true)
      );

      if (response) {
        this.brandData = response.content;

      } else {
        console.error('No se recibieron datos de marca de la API.');

      }
    } catch (error) {
      console.error('Error al obtener brands:', error);

    }
  }


}
