import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public active : boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  setActive(): void {
    this.active = !this.active;
  }

}
