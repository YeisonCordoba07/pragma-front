import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-sort-direction',
  templateUrl: './table-sort-direction.component.html',
  styleUrls: ['./table-sort-direction.component.scss']
})
export class TableSortDirectionComponent implements OnInit {

  @Output() ascendingChange = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onChangeAscending(): void{
    this.ascendingChange.emit();
  }
}
