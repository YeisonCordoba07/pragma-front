import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {
  @Input() placeholderText: string = "";
  @Output() valueChange = new EventEmitter<string>();

  @Input() textLabel: string = "Campo de texto";
  @Input() control!: FormControl;
  @Input() maxInputLength: number = 200;
  @Input() type: "text" | "email" | "password" | "number" | "date" = "text";
  @Input() inputId!: string;



  constructor() { }

  ngOnInit(): void {
  }


}
