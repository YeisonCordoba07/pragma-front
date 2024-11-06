import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LoginService} from "../../../services/auth/login.service";
import {LoginUserData} from "../../../../types/login";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  userIsLogin: boolean = false;
  userLoginData: LoginUserData = {email:"", role:""};

  @Output() closeNav: EventEmitter<void> = new EventEmitter();

  constructor(private readonly loginService: LoginService) { }



  ngOnInit(): void {
    this.loginService.currentUserIsLogin.subscribe({
      next: (userLoginOn) => {
        this.userIsLogin = userLoginOn;
      }
    });

    this.loginService.currentLoginData.subscribe({
      next: (data) => {
        this.userLoginData = data;
      }
    });

    this.loginService.getSessionToken();
  }


  handleCloseNav() {
    this.closeNav.emit(); // Emitir el evento para cerrar la navegación
  }

  ngOnDestroy(): void {
    this.loginService.currentUserIsLogin.unsubscribe();
    this.loginService.currentLoginData.unsubscribe();
  }


  logout():void{
    this.loginService.logout();
    this.handleCloseNav();
  }


}
