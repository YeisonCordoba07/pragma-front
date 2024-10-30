import {Component, OnInit} from '@angular/core';
import {UserAccountService} from "../../services/user-account/user-account.service";
import {lastValueFrom} from "rxjs";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Option} from "../../../types/Option";


@Component({
  selector: 'app-create-aux',
  templateUrl: './create-aux.component.html',
  styleUrls: ['./create-aux.component.scss']
})
export class CreateAuxComponent implements OnInit {

  maxLengthName: number = 50;
  maxLengthLastName: number = 120;
  maxLengthPhone: number = 13;

  formAux!: FormGroup;

  showToast: boolean = false;
  toastMessage: string = '';
  typeToastMessage: "error" | "warning" | "success" | "neutral" = "neutral";

  roleOptions: Option[] = [
    { name: 'AUX_BODEGA', value: "AUX_BODEGA" },
  ];


  constructor(private readonly userAccountService: UserAccountService, private readonly fb: FormBuilder) {
    this.formAux = this.fb.group({

      name: ['', [Validators.required, Validators.maxLength(this.maxLengthName)]],
      lastName: ['', [Validators.required, Validators.maxLength(this.maxLengthLastName)]],
      identityDocument: [0, [Validators.required, Validators.min(1)]],
      phone: ['', [Validators.required, Validators.maxLength(this.maxLengthPhone)]],
      birthDate: ['', [Validators.required, this.adultValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    })
  }

  // Validador personalizado para verificar si el usuario es mayor de edad (18 años)
  adultValidator(control: AbstractControl): ValidationErrors | null {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (
      age > 18 ||
      (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
    ) {
      return null; // Es mayor de edad
    }

    return { notAdult: true }; // No es mayor de edad
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

  async createAux(formData: any) {

    const newAux = {
      ...formData,
      identityDocument: Number(formData.identityDocument), // Asegura que sea un número
    };


    // POST REQUEST TO CREATE CATEGORY
    try {
      const response = await lastValueFrom(
        this.userAccountService.createUser(newAux));

      if (response.status === 201) {

        this.typeToastMessage = "success";
        this.showCustomToast("Usuario creado exitosamente");

      }
    } catch (error) {

      this.typeToastMessage = "error";
      this.showCustomToast("Error al enviar la solicitud");
    }

  }




  // Getters
  get name() {
    return this.formAux.get('name') as FormControl;
  }
  get lastName() {
    return this.formAux.get('lastName') as FormControl;
  }
  get identityDocument() {
    return this.formAux.get('identityDocument') as FormControl;
  }
  get phone() {
    return this.formAux.get('phone') as FormControl;
  }
  get birthDate() {
    return this.formAux.get('birthDate') as FormControl;
  }
  get email() {
    return this.formAux.get('email') as FormControl;
  }
  get password() {
    return this.formAux.get('password') as FormControl;
  }
  get role() {
    return this.formAux.get('role') as FormControl;
  }
}
