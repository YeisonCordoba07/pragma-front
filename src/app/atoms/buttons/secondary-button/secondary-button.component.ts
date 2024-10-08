import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss']
})
export class SecondaryButtonComponent implements OnInit {

  @Input() buttonText: string = "Button";
  constructor() { }

  ngOnInit(): void {
  }

}
