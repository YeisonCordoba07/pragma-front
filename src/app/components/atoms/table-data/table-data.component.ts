import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Option} from "../../../../types/Option";


@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit {

  // Pagination
  @Input() page: number = 0;
  @Input() size: number = 5;
  @Input() totalElements: number = 0;
  @Input() totalPages: number = 0;
  @Input() ascending: boolean = true;

  @Output() leftClick: EventEmitter<any> = new EventEmitter();
  @Output() rightClick: EventEmitter<any> = new EventEmitter();

  // Table
  @Input() mainTitle: string = "Sin titulo";
  @Input() inputData: any[] = [];
  @Input() columnHeaders: string[] = [];

  // Data Sort
  @Input() orderOptions: Option[] = [];
  @Input() dataOptions: Option[] = [];

  @Output() changeSort: EventEmitter<any> = new EventEmitter();
  @Output() changeTable: EventEmitter<any> = new EventEmitter<string>();



  constructor() { }

  ngOnInit(): void {

  }

  changeAscending() {

    this.changeSort.emit();
  }
  onChangeTable(value: String) {

    this.changeTable.emit(value);
  }


  prevPage() {
    this.leftClick.emit();
  }

  nextPage() {
    this.rightClick.emit();
  }


}
