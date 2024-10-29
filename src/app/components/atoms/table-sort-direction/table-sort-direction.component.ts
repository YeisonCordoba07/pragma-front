import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Option} from "../../../../types/Option";

@Component({
  selector: 'app-table-sort-direction',
  templateUrl: './table-sort-direction.component.html',
  styleUrls: ['./table-sort-direction.component.scss']
})
export class TableSortDirectionComponent implements OnInit {

  @Output() ascendingChange = new EventEmitter<void>();
  @Output() tableChange = new EventEmitter<String>();
  @Input() dataOption: Option[] = [];
  @Input() inputTitle: string = "Ordenar";
  constructor() { }

  ngOnInit(): void {
  }

  onChangeAscending(value: String): void{
    this.ascendingChange.emit();
    this.tableChange.emit(value);
  }
  onChangeTable(value: String): void{
    this.tableChange.emit(value);
  }

}
