import {Component, OnInit} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {BrandService} from "../../services/brand/brand.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  BRAND_SUCCESSFULLY_CREATED, FIELD_DESCRIPTION,
  FIELD_NAME, ID_FIELD_DESCRIPTION,
  ID_FIELD_NAME,
  TITLE_CREATE_BRAND
} from "../../constants/brand.constants";
import {SEND_ERROR} from "../../constants/global.constants";

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {

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
        this.brandService.createBrand(newBrand));

      if (response.status === 201) {

        this.typeToastMessage = "success";
        this.showCustomToast(BRAND_SUCCESSFULLY_CREATED);

      }
    } catch (error) {

      this.typeToastMessage = "error";
      this.showCustomToast(SEND_ERROR);
    }

  }


  // Getters
  get name() {
    return this.formBrand.get('name') as FormControl;
  }

  get description() {
    return this.formBrand.get('description') as FormControl;
  }


  protected readonly TITLE_CREATE_BRAND = TITLE_CREATE_BRAND;
  protected readonly FIELD_NAME = FIELD_NAME;
  protected readonly ID_FIELD_NAME = ID_FIELD_NAME;
  protected readonly FIELD_DESCRIPTION = FIELD_DESCRIPTION;
  protected readonly ID_FIELD_DESCRIPTION = ID_FIELD_DESCRIPTION;
}
