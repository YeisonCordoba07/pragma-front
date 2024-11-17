import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../../services/auth/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  private readonly authService: LoginService = inject(LoginService);
  private readonly router: Router = inject(Router);


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    // Si ya está logueado, no deja que entre al login
    if(this.authService.getSessionToken()){
      return this.router.navigate(['/']);
    }else{
      return true;
    }
  }

}
