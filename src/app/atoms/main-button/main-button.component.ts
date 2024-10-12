import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss']
})
export class MainButtonComponent implements OnInit {

  @Input() buttonText: string = "Button";
  @Input() disabled: boolean = false;
  @Input() typeButton:  "primary" | "secondary" = "primary";
  @Input() imgSource: string = "";
  constructor() { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty

  }

}
