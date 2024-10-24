import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemService} from "../../../services/item/item.service";
import {firstValueFrom} from "rxjs";

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
  @Input() orderBy: string = "item";

  @Output() leftClick: EventEmitter<any> = new EventEmitter();
  @Output() rightClick: EventEmitter<any> = new EventEmitter();
  @Output() changeSort: EventEmitter<any> = new EventEmitter();
  @Output() changeTable: EventEmitter<any> = new EventEmitter<string>();


  constructor() {
  }

  ngOnInit(): void {
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
  changeAscending2(value: string) {
    this.orderBy = value;
    this.changeTable.emit(this.orderBy);
  }
}
