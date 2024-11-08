import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item/item.service";
import {firstValueFrom, lastValueFrom} from "rxjs";
import {Option} from "../../../types/Option";
import {ItemModel} from "../../../types/item.model";
import {LoginService} from "../../services/auth/login.service";
import {LoginUserData} from "../../../types/login";
import {CATEGORY_SUCCESSFULLY_CREATED, FIELD_NAME, ID_FIELD_NAME} from "../../constants/category.constants";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SupplyService} from "../../services/supply/supply.service";

@Component({
  selector: 'app-get-items',
  templateUrl: './get-items.component.html',
  styleUrls: ['./get-items.component.scss']
})
export class GetItemsComponent implements OnInit {
  itemData: ItemModel[] = [];

  page: number = 0;
  size: number = 5;
  totalElements: number = 0;
  totalPages: number = 0;
  ascending: boolean = true;
  orderBy: string = "itemEntity";

  dataColumns: string[] = ['ID', 'Nombre', 'Descripción', 'Cantidad', 'Precio', 'Marca', 'Categorías']

  dataOptions: Option[] = [
    { name: 'Item', value: 'itemEntity' },
    { name: 'Brand', value: 'brand' },
    { name: 'Category', value: 'category' }
  ];

  orderOptions: Option[] = [
    { name: '↑ Ascendente', value: true },
    { name: '↓ Descendente', value: false },
  ];




  userIsLogin: boolean = false;
  userLoginData: LoginUserData = {email:"", role:""};

  formSupply: FormGroup;


  constructor(
    private readonly itemService: ItemService,
    private readonly supplyService: SupplyService,
    private readonly loginService: LoginService,
    private readonly fb: FormBuilder) {

    this.formSupply = this.fb.group({
      supply: [0, [Validators.required, Validators.min(1)]],
    })
  }



  ngOnInit(): void {
    this.loadItems();

    this.loginService.currentUserIsLogin.subscribe({
      next: (userLoginOn) => {
        this.userIsLogin = userLoginOn;
      }
    });

    this.loginService.currentLoginData.subscribe({
      next: (data) => {
        this.userLoginData = data;
      }
    });

    this.loginService.getSessionToken();

    if(this.userLoginData.role == "AUX_BODEGA"){
      this.dataColumns.push('Agregar suministro');
      console.log(this.dataColumns);

    }


  }

  get supply() {
    return this.formSupply.get('supply') as FormControl;
  }

  // GET REQUEST
  addSupply(): void{
    if (this.formSupply.valid) {
      // Emitir los datos del formulario al componente padre
      //this.formSubmitted.emit(this.inputForm.value);

      const newSupply = {
        idItem: 18,
        quantity: this.formSupply.get('supply')?.value
      };

      this.supplyService.addSupply(newSupply);

    }
  }


  async loadItems(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.itemService.getItem(
          this.page, this.size, this.orderBy, this.ascending)
      );

      if (response) {
        this.itemData = response.content;
        this.page = response.page;
        this.size = response.size;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;

      }
    } catch (error) {
      console.error('Error al obtener articulos:', error);

    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadItems();
    }
  }


  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadItems();
    }
  }


  changeAscending(): void{
    this.ascending = !this.ascending;
    console.log("cambio");
    this.loadItems();
  }

  changeAscending2(orderBy: String) {
    this.orderBy = orderBy.toString();
    this.loadItems();
  }

  protected readonly FIELD_NAME = FIELD_NAME;
  protected readonly ID_FIELD_NAME = ID_FIELD_NAME;
}
