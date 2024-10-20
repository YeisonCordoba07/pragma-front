import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {
  @Input() placeholderText: string = "";
  @Input() idInput: string | undefined;
  @Output() valueChange = new EventEmitter<string>();


  @Input() textLabel: string = "Campo de texto";
  @Input() control!: FormControl;
  @Input() maxInputLength: number = 50;
  @Input() type: "text" | "email" | "password" = "text";
  @Input() id!: string;



  constructor() { }

  ngOnInit(): void {
  }


}
