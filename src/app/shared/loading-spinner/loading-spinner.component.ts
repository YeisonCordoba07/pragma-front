import { Component, OnInit } from '@angular/core';
import {LoadingService} from "../../services/loading/loading.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  isLoading: Observable<boolean> = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
  }

}
