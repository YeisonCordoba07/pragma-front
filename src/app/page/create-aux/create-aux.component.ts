import {Component, Input, OnInit} from '@angular/core';
import {UserAccountService} from "../../services/user-account/user-account.service";
import {lastValueFrom} from "rxjs";


@Component({
  selector: 'app-create-aux',
  templateUrl: './create-aux.component.html',
  styleUrls: ['./create-aux.component.scss']
})
export class CreateAuxComponent implements OnInit {

  @Input() maxLengthName: number = 120;
  @Input() maxLengthLastName: number = 120;
  @Input() maxLengthPhone: number = 13;

  showToast: boolean = false;
  toastMessage: string = '';
  typeToastMessage: "error" | "warning" | "success" | "neutral" = "neutral";


  constructor(private readonly userAccountService: UserAccountService) {
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
      name: formData.name,
      lastName: formData.lastName,
      documentId: formData.documentId,
      phone: formData.phone,
      birthDate: formData.birthDate,
      email: formData.email,
      password: formData.password,
      role: formData.role,

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
}
