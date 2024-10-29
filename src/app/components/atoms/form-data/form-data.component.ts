import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss']
})
export class FormDataComponent implements OnInit {

  @Input() mainTitle: string = "Sin titulo";

  @Input() inputData: any[] = [];
  @Input() columnHeaders: string[] = [];


  constructor() { }

  ngOnInit(): void {

  }

}
