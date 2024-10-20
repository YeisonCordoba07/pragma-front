import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  @Input() maxLengthName: number = 50;
  @Input() maxLengthDescription: number = 120;

  formUser: FormGroup;

  get name() {
    return this.formUser.get('name') as FormControl;
  }

  get description() {
    return this.formUser.get('description') as FormControl;
  }

  constructor(private fb: FormBuilder) {
    this.formUser = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(this.maxLengthName)]],
      description: ['', [Validators.required, Validators.maxLength(this.maxLengthDescription)]],
    })
  }

  ngOnInit(): void {
  }

  enviarFormulario(): void {
    console.log(this.formUser);
  }

}
