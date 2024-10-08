import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent implements OnInit {

  @Input() buttonText: string = "Button";
  constructor() { }

  ngOnInit(): void {
  }

}
