import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  @Input() maxLengthName: number = 50;
  @Input() maxLengthDescription: number = 120;
  @Output() formSubmitted = new EventEmitter<any>();

  formUser: FormGroup;


  constructor(private fb: FormBuilder) {
    this.formUser = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(this.maxLengthName)]],
      description: ['', [Validators.required, Validators.maxLength(this.maxLengthDescription)]],
      quantity: [0, [Validators.required, Validators.min(1)]],

      price: [0.0, [Validators.required, Validators.min(1.0)]],

    })
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



  onSubmit() {
    if (this.formUser.valid) {
      // Emitir los datos del formulario al componente padre
      this.formSubmitted.emit(this.formUser.value);
    }
  }

}
