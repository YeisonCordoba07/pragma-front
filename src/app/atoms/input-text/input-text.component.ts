import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {
  @Input() placeholderText: string = "";
  @Input() idInput: string | undefined;
  @Output() valueChange = new EventEmitter<string>();
  public inputValue: string = "";


  constructor() { }

  ngOnInit(): void {
  }

  sendValue(){
    this.valueChange.emit(this.inputValue);
  }

}
