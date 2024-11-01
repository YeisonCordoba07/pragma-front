import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LoginService} from "../../../services/auth/login.service";
import {LoginUserData} from "../../../../types/login";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  userLoginOn: boolean = false;
  userLoginData: LoginUserData = {email:"", role:""};

  @Output() closeNav: EventEmitter<void> = new EventEmitter();
  constructor(private readonly loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.loginService.currentLoginData.subscribe({
      next: (data) => {
        this.userLoginData = data;
      }
    })
  }

  handleCloseNav() {
    this.closeNav.emit(); // Emitir el evento para cerrar la navegación
  }

  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
  }


}
