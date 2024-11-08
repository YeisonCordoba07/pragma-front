import {Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from "../../types/category.model";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() inputId: number = 0;
  @Input() name: string = "Articulo";
  @Input() description: string = "Descripción";
  @Input() quantity: number = 0;
  @Input() price: number = 0.0;
  @Input() brand: string = "Marca";
  @Input() categories: CategoryModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
