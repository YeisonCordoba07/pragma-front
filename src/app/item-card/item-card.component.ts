import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryModel} from "../../types/category.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() inputId: number = 0;
  @Input() name: string = "Articulo";
  @Input() description: string = "Descripción";
  @Input() quantity: number = 0;
  @Input() price: number = 0.0;
  @Input() brand: string = "Marca";
  @Input() categories: CategoryModel[] = [];
  @Input() hasRole: boolean = false;

  formSupply: FormGroup;

  @Output() formSubmitted = new EventEmitter<any>();

  constructor(private readonly fb: FormBuilder) {

    this.formSupply = this.fb.group({
      supplyItemId: [0, Validators.required],
      supplyQuantity: [0, [Validators.required, Validators.min(1)]],
    })
  }


  get supplyQuantity() {
    return this.formSupply.get('supplyQuantity') as FormControl;
  }

  ngOnInit(): void {
    this.formSupply.patchValue({
      supplyItemId: this.inputId
    });
  }


  onSubmit() {
    if (this.formSupply.valid && this.hasRole) {
      // Emitir los datos del formulario al componente padre
      this.formSubmitted.emit(this.formSupply.value);
      this.formSupply.reset();
    }
  }
}
