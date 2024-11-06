import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {LoginService} from "../services/auth/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly authService: LoginService = inject(LoginService);
  private readonly router: Router = inject(Router);


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const allowedRoles = route.data?.['allowedRoles'];



    if(this.authService.getSessionToken()){
      return this.authService.loginData.pipe(
        map(user =>{
          return Boolean( user && allowedRoles.includes(user.role));
        })
      )
    }else{
      return this.router.navigate(['/login']);
    }
  }


}
