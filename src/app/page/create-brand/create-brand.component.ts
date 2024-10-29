import {Component, OnInit} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {BrandService} from "../../services/brand/brand.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {

  readonly token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjoiQURNSU4iLCJpYXQiOjE3MjkzOTM0MTEsImV4cCI6MTczMTk4NTQxMX0.cQDOqMKqfvsfGdxsI74CJLdbHrCG_xTDkat9uNWxbhk";
  showToast: boolean = false;
  toastMessage: string = '';
  typeToastMessage: "error" | "warning" | "success" | "neutral" = "neutral";

  formBrand: FormGroup;
  maxLengthName: number = 50;
  maxLengthDescription: number = 120;


  constructor(private readonly brandService: BrandService, private readonly fb: FormBuilder) {
    this.formBrand = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(this.maxLengthName)]],
      description: ['', [Validators.required, Validators.maxLength(this.maxLengthDescription)]],
    })
  }

  ngOnInit(): void {

  }


  showCustomToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 5000); // Duración del toast
  }


  async createBrand(formData: any) {

    const newBrand = {
      name: formData.name,
      description: formData.description
    };


    // POST REQUEST TO CREATE BRAND
    try {

      const response = await lastValueFrom(
        this.brandService.createBrand(newBrand, this.token));

      if (response.status === 201) {

        this.typeToastMessage = "success";
        this.showCustomToast("Marca creada exitosamente");

      }
    } catch (error) {

      this.typeToastMessage = "error";
      this.showCustomToast("Error al enviar la solicitud");
    }

  }


  // Getters
  get name() {
    return this.formBrand.get('name') as FormControl;
  }

  get description() {
    return this.formBrand.get('description') as FormControl;
  }


}
