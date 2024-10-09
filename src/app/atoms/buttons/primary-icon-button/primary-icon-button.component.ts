import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-primary-icon-button',
  templateUrl: './primary-icon-button.component.html',
  styleUrls: ['./primary-icon-button.component.scss']
})
export class PrimaryIconButtonComponent implements OnInit {

  @Input() buttonText: string = "Button";

  constructor() { }

  ngOnInit(): void {
  }

}