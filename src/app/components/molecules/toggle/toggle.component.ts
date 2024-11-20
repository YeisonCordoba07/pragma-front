import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  isActive: boolean = false;

  toggleState() {
    this.isActive = !this.isActive;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
