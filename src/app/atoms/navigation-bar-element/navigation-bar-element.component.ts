import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation-bar-element',
  templateUrl: './navigation-bar-element.component.html',
  styleUrls: ['./navigation-bar-element.component.scss']
})
export class NavigationBarElementComponent implements OnInit {

  @Input() isActived: boolean = false;
  @Input() elementText: string = "Menu #";
  @Input() elementIcon: string = "favicon.ico";
  constructor() { }

  ngOnInit(): void {
  }

}
