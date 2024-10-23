import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Output() closeNav: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  handleCloseNav() {
    this.closeNav.emit(); // Emitir el evento para cerrar la navegación
  }


}
