import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  @Input() maxLengthName: number = 50;
  @Input() maxLengthDescription: number = 120;
  @Output() formSubmitted = new EventEmitter<any>();

  @Input() mainTitle: string = "Titulo creación"

  formUser: FormGroup;


  constructor(private readonly fb: FormBuilder) {
    this.formUser = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(this.maxLengthName)]],
      description: ['', [Validators.required, Validators.maxLength(this.maxLengthDescription)]],
    })
  }


  // Getters
  get name() {
    return this.formUser.get('name') as FormControl;
  }

  get description() {
    return this.formUser.get('description') as FormControl;
  }


  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formUser.valid) {
      // Emitir los datos del formulario al componente padre
      this.formSubmitted.emit(this.formUser.value);
    }
  }

}
