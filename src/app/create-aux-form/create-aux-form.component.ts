import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-aux-form',
  templateUrl: './create-aux-form.component.html',
  styleUrls: ['./create-aux-form.component.scss']
})
export class CreateAuxFormComponent implements OnInit {

  @Input() maxLengthName: number = 120;
  @Input() maxLengthLastName: number = 120;
  @Input() maxLengthPhone: number = 13;
  @Input() mainTitle: string = "Titulo";
  @Output() formSubmitted = new EventEmitter<any>();

  formAux: FormGroup;


  constructor(private readonly fb: FormBuilder) {
    this.formAux = this.fb.group({

      name: ['', [Validators.required, Validators.maxLength(this.maxLengthName)]],
      lastName: ['', [Validators.required, Validators.maxLength(this.maxLengthLastName)]],
      documentId: [0, [Validators.required, Validators.min(1)]],
      phone: ['', [Validators.required, Validators.maxLength(this.maxLengthPhone)]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      role: ['AUX_ROLE', [Validators.required]],
    })
  }

  ngOnInit(): void {

  }

  // Getters
  get name() {
    return this.formAux.get('name') as FormControl;
  }
  get lastName() {
    return this.formAux.get('lastName') as FormControl;
  }
  get documentId() {
    return this.formAux.get('documentId') as FormControl;
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


  onSubmit() {
    if (this.formAux.valid) {
      // Emitir los datos del formulario al componente padre
      console.log(this.formAux.value);
      this.formSubmitted.emit(this.formAux.value);
      this.formAux.reset({
        name: '',
        lastName: '',
        documentId: 0,
        phone: '',
        birthDate: '',
        email: '',
        password: '',
        role: ''
      });
    }
  }




}
