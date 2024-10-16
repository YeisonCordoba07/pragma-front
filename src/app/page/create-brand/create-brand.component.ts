import { Component, OnInit } from '@angular/core';
import {lastValueFrom} from "rxjs";
import {BrandService} from "../../services/brand/brand.service";

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {

  public brandName: string = "";
  public brandDescription: string = "";

  public nameError: string = "";
  public descriptionError: string = "";
  public brandStatus: string = "";
  private readonly token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3Mjg0MzU5NjUsImV4cCI6MTcyOTI5OTk2NX0.fgaWToNQjV4D6dOO529768D8g7MeZIa8PuIwmFdoPWE";

  showToast: boolean = false;
  toastMessage: string = '';
  typeToastMessage: "error" | "warning" | "success" | "neutral" = "neutral";




  constructor(private readonly brandService: BrandService) { }

  ngOnInit(): void {
    this.nameError = "Nombre no puede estar vacio";
    this.descriptionError = "Descripcion no puede estar vacia";
    this.showCustomToast("Se creó la aplicación con exito");
  }

  showCustomToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 5000); // Duración del toast
  }



  updateBrandValues(type: "name" | "description", value: string) {
    if (type === "name") {
      if (value.length > 50) {
        this.nameError = "El nombre no puede tener más de 50 caracteres.";
      }
      else if(value.length === 0){
        this.nameError = "El nombre no puede estar vacio.";
      } else {
        this.nameError = "";
        this.brandName = value;
      }
    } else if (type === "description") {
      if (value.length > 120) {
        this.descriptionError = "La descripción no puede tener más de 120 caracteres.";
      }else if(value.length === 0){
        this.descriptionError = "La descripción no puede estar vacia.";
      }  else {
        this.descriptionError = "";
        this.brandDescription = value;
      }
    }
  }

  async createBrand() {
    if (!this.nameError && !this.descriptionError) {
      const newBrand = {
        name: this.brandName,
        description: this.brandDescription
      };


      // POST REQUEST TO CREATE BRAND
      try {
        // POST REQUEST TO CREATE BRAND USING async/await
        const response = await lastValueFrom(
          this.brandService.createBrand(newBrand, this.token));

        if (response.status === 201) {
          this.brandStatus = "Marca creada exitosamente";
          this.typeToastMessage = "success";
          this.showCustomToast("Marca creada exitosamente");

        } else {
          this.brandStatus = "... al crear marca";
        }
      } catch (error) {

        this.brandStatus = "Error al enviar la solicitud";
        this.typeToastMessage = "error";
        this.showCustomToast("Error al enviar la solicitud");
      }
    }
  }

}
