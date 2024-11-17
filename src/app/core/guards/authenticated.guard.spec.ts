import { TestBed } from '@angular/core/testing';

import { AuthenticatedGuard } from './authenticated.guard';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "../../services/auth/login.service";


describe('AuthenticatedGuard', () => {
  let guard: AuthenticatedGuard;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  let router: Router;
  let loginService: jest.Mocked<LoginService>;

  beforeEach(() => {
    const loginServiceMock = {
      getSessionToken: jest.fn(),
    }

    const routerMock = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;


    TestBed.configureTestingModule({
      providers: [
        AuthenticatedGuard,
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthenticatedGuard);
    loginService = TestBed.inject(LoginService) as jest.Mocked<LoginService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    route = new ActivatedRouteSnapshot();
    state = { url: '/protected-route' } as RouterStateSnapshot;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it("should redirect to home when user is logued", () =>{
    loginService.getSessionToken.mockReturnValue(true);

    const result = guard.canActivate(route, state);
    expect(result).toEqual(router.navigate(['/login']));
  });

  it("should user allow to login page when user is not logued", () =>{
    loginService.getSessionToken.mockReturnValue(false);

    const result = guard.canActivate(route, state);
    expect(result).toBe(true);
  })
});
