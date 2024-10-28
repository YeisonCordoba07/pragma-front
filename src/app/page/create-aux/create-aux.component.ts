import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-create-aux',
  templateUrl: './create-aux.component.html',
  styleUrls: ['./create-aux.component.scss']
})
export class CreateAuxComponent implements OnInit {

  @Input() maxLengthName: number = 120;
  @Input() maxLengthLastName: number = 120;
  @Input() maxLengthPhone: number = 13;



  constructor() {
  }

  ngOnInit(): void {

  }



  async createAux(formData: any) {

    const newAux = {
      name: formData.name,
      lastName: formData.lastName,
      documentId: formData.documentId,
      phone: formData.phone,
      birthDate: formData.birthDate,
      email: formData.email,
      password: formData.password

    };

    // POST REQUEST TO CREATE CATEGORY
    /*try {
      const response = await lastValueFrom(
        this.itemService.createItem(newItem, this.token));

      if (response.status === 201) {

        this.typeToastMessage = "success";
        this.showCustomToast("Articulo creado exitosamente");

      }
    } catch (error) {

      this.typeToastMessage = "error";
      this.showCustomToast("Error al enviar la solicitud");
    }*/

  }
}
