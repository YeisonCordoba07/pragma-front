import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() inputData: any[] = [];

  @Input() mainTitle: string = "Titulo tabla";

  @Input() page: number = 0;
  @Input() size: number = 5;
  @Input() totalElements: number = 0;
  @Input() totalPages: number = 0;
  @Input() ascending: boolean = true;

  @Output() leftClick: EventEmitter<any> = new EventEmitter();
  @Output() rightClick: EventEmitter<any> = new EventEmitter();
  @Output() changeSort: EventEmitter<any> = new EventEmitter();


  constructor() { }


  ngOnInit(): void {
  }



  prevPage(): void {
    this.leftClick.emit();
  }

  nextPage(): void {
    this.rightClick.emit();
  }

  changeAscending(): void{
    this.changeSort.emit();
  }

}
