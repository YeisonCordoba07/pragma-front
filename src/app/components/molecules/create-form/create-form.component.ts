import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  @Input() mainTitle: string = "Titulo creación"
  @Input() maxLengthName: number = 50;
  @Input() maxLengthDescription: number = 120;
  @Output() formSubmitted = new EventEmitter<any>();


  @Input() inputForm!: FormGroup;


  constructor() {

  }


  ngOnInit(): void {
  }

  onSubmit() {
    if (this.inputForm.valid) {
      // Emitir los datos del formulario al componente padre
      this.formSubmitted.emit(this.inputForm.value);
      this.inputForm.reset();
    }
  }

}
