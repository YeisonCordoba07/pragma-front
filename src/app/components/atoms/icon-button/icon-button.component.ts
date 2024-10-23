import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {
  @Input() imgSrc: string = '';
  @Input() imgAlt: string = '';
  @Input() imgWidth: string = '32';
  @Input() imgHeight: string = '32';
  @Output() onClick = new EventEmitter<void>();

  handleClick(): void {
    this.onClick.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
