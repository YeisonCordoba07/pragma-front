import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() page: number = 0;
  @Input() size: number = 5;
  @Input() totalElements: number = 0;
  @Input() totalPages: number = 0;
  @Output() leftClick: EventEmitter<any> = new EventEmitter();
  @Output() rightClick: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  prevPage() {
    this.leftClick.emit();
  }

  nextPage() {
    this.rightClick.emit();
  }
}
