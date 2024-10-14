import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-icon',
  templateUrl: './save-icon.component.html',
  styleUrls: ['./save-icon.component.scss']
})
export class SaveIconComponent implements OnInit {

  @Input() iconColor: string = "#FFFFFF";
  constructor() { }

  ngOnInit(): void {
  }

}
