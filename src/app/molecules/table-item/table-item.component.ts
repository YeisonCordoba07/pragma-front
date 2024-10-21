import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss']
})
export class TableItemComponent implements OnInit {

  @Input() mainTitle: string = "Titulo";
  @Input() maxLengthName: number = 50;
  @Input() maxLengthDescription: number = 120;
  @Input() categoryData: any[] = [];
  @Input() brandData: any[] = [];
  @Output() formSubmitted = new EventEmitter<any>();

  formUser: FormGroup;


  constructor(private readonly fb: FormBuilder) {
    this.formUser = this.fb.group({

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
  }



  // Getters
  get name() {
    return this.formUser.get('name') as FormControl;
  }

  get description() {
    return this.formUser.get('description') as FormControl;
  }

  get quantity(){
    return this.formUser.get('quantity') as FormControl;
  }

  get price(){
    return this.formUser.get('price') as FormControl;
  }

  get categories() {
    return this.formUser.get('categories') as FormControl;
  }

  get brandName() {
    return this.formUser.get('brandName') as FormControl;
  }



  onSubmit() {
    if (this.formUser.valid) {
      // Emitir los datos del formulario al componente padre
      console.log(this.formUser.value);
      this.formSubmitted.emit(this.formUser.value);
    }
  }



}
