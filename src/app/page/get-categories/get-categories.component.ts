import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-get-categories',
  templateUrl: './get-categories.component.html',
  styleUrls: ['./get-categories.component.scss']
})
export class GetCategoriesComponent implements OnInit {

  @Input() mainTitle: string = "Sin titulo";
  @Input() datos: any[] = [];


  constructor() { }

  ngOnInit(): void {

  }

}
