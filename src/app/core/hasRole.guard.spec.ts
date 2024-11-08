import { TestBed } from '@angular/core/testing';
import { HasRoleGuard } from './hasRole.guard';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { of, isObservable } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: HasRoleGuard;
  let loginService: jest.Mocked<LoginService>;
  let router: jest.Mocked<Router>;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    const loginServiceMock = {
      getSessionToken: jest.fn(),
      loginData: of({ email: 'user@example.com', role: 'USER' }),
    };
    const routerMock = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      providers: [
        HasRoleGuard,
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    authGuard = TestBed.inject(HasRoleGuard);
    loginService = TestBed.inject(LoginService) as jest.Mocked<LoginService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    route = new ActivatedRouteSnapshot();
    state = { url: '/protected-route' } as RouterStateSnapshot;
  });

  it('debe permitir la activación cuando el usuario tiene el rol adecuado', (done) => {
    loginService.getSessionToken.mockReturnValue(true);
    route.data = { allowedRoles: ['USER'] };

    // Mock directo del observable
    (loginService as any).loginData = of({ email: 'user@example.com', role: 'USER' });

    const result = authGuard.canActivate(route, state);
    if (isObservable(result)) {
      result.subscribe((res) => {
        expect(res).toBe(true);
        done();
      });
    }
  });

  it('debe denegar la activación y redirigir a login cuando el usuario no tiene el rol adecuado', (done) => {
    loginService.getSessionToken.mockReturnValue(true);
    route.data = { allowedRoles: ['ADMIN'] };

    (loginService as any).loginData = of({ email: 'user@example.com', role: 'USER' });

    const result = authGuard.canActivate(route, state);
    if (isObservable(result)) {
      result.subscribe((res) => {
        expect(res).toBe(false);
        done();
      });
    }
  });

  it('should redirect to login when there is not token session', () => {
    loginService.getSessionToken.mockReturnValue(false);

    const result = authGuard.canActivate(route, state);
    expect(result).toEqual(router.navigate(['/login']));
  });
});
