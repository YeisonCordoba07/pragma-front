import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-select-element',
  templateUrl: './select-element.component.html',
  styleUrls: ['./select-element.component.scss']
})
export class SelectElementComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() inputId!: string;
  @Input() inputData: any[] = [];
  @Input() inputLabel: string = "Seleccionar:";


  constructor() { }

  ngOnInit(): void {
  }

}
