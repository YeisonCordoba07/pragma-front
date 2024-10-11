import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-secondary-icon-button',
  templateUrl: './secondary-icon-button.component.html',
  styleUrls: ['./secondary-icon-button.component.scss']
})
export class SecondaryIconButtonComponent implements OnInit {
  @Input() buttonText: string = "Button";
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
