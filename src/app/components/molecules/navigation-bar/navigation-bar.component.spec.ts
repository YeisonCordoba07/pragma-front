import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarComponent } from './navigation-bar.component';
import { LoginService } from "../../../services/auth/login.service";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

class MockLoginService {
  currentUserIsLogin = of(true); // Simula que el usuario está logueado
  currentLoginData = of({ email: "test@example.com", role: "ADMIN" }); // Datos de usuario mock
  getSessionToken() {}
  logout() {}
}

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;
  let mockLoginService: MockLoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBarComponent ],
      providers: [{ provide: LoginService, useClass: MockLoginService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    mockLoginService = TestBed.inject(LoginService) as unknown as MockLoginService;
    fixture.detectChanges(); // Llama a ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('closeNav functionality', () => {
    it('should emit the closeNav event when handleCloseNav is called', () => {
      jest.spyOn(component.closeNav, 'emit');
      component.handleCloseNav();
      expect(component.closeNav.emit).toHaveBeenCalled();
    });

    it('should emit closeNav when the close button is clicked', () => {
      jest.spyOn(component.closeNav, 'emit');
      const closeButton = fixture.debugElement.query(By.css('app-icon-button'));
      closeButton.triggerEventHandler('onClick', null);
      expect(component.closeNav.emit).toHaveBeenCalled();
    });

    it('should call handleCloseNav when the navigation element emits closeNav', () => {
      jest.spyOn(component, 'handleCloseNav');
      const navElements = fixture.debugElement.queryAll(By.css('app-navigation-bar-element'));
      navElements[0].triggerEventHandler('closeNav', null);
      expect(component.handleCloseNav).toHaveBeenCalled();
    });
  });

  describe('user login data', () => {
    it('should update userIsLogin and userLoginData on ngOnInit', () => {
      expect(component.userIsLogin).toBe(true);
      expect(component.userLoginData.email).toBe('test@example.com');
      expect(component.userLoginData.role).toBe('ADMIN');
    });
  });

  describe('logout functionality', () => {
    it('should call logout and handleCloseNav when logout is called', () => {
      jest.spyOn(mockLoginService, 'logout');
      jest.spyOn(component, 'handleCloseNav');
      component.logout();
      expect(mockLoginService.logout).toHaveBeenCalled();
      expect(component.handleCloseNav).toHaveBeenCalled();
    });
  });
});
