import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-link',
  templateUrl: './icon-link.component.html',
  styleUrls: ['./icon-link.component.scss']
})
export class IconLinkComponent implements OnInit {
  @Input() pageUrl: string = "#";
  @Input() imgAlt: string = "";
  @Input() imgWidth: string = "25";
  @Input() imgHeight: string = "25";
  @Input() imgSource: string = "favicon.ico";

  constructor() { }

  ngOnInit(): void {
  }

}
