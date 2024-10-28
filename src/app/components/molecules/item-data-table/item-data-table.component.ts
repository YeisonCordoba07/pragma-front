import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Option} from "../../../../types/Option";


@Component({
  selector: 'app-item-data-table',
  templateUrl: './item-data-table.component.html',
  styleUrls: ['./item-data-table.component.scss']
})


export class ItemDataTableComponent implements OnInit {

  @Input() inputData: any[] = [];

  @Input() mainTitle: string = "Titulo tabla";
  @Input() page: number = 0;
  @Input() size: number = 5;
  @Input() totalElements: number = 0;
  @Input() totalPages: number = 0;
  @Input() ascending: boolean = true;
  @Input() orderBy: string = "itemEntity";

  @Output() leftClick: EventEmitter<any> = new EventEmitter();
  @Output() rightClick: EventEmitter<any> = new EventEmitter();
  @Output() changeSort: EventEmitter<any> = new EventEmitter();
  @Output() changeTable: EventEmitter<any> = new EventEmitter<string>();

  dataOptions: Option[] = [
    { name: 'Item', value: 'itemEntity' },
    { name: 'Brand', value: 'brand' },
    { name: 'Category', value: 'category' }
  ];

  orderOptions: Option[] = [
    { name: '↑ Ascendente', value: true },
    { name: '↓ Descendente', value: false },
  ];


  constructor() {
  }

  ngOnInit(): void {
    this.dataOptions = [
      { name: 'Item', value: 'itemEntity' },
      { name: 'Brand', value: 'brand' },
      { name: 'Category', value: 'category' }
    ];

    this.orderOptions = [
      { name: '↑ Ascendente', value: true },
      { name: '↓ Descendente', value: false },
    ];
  }


  prevPage() {
    this.leftClick.emit();
  }

  nextPage() {
    this.rightClick.emit();
  }

  changeAscending() {

    this.changeSort.emit();
  }

}
