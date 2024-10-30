import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAuxComponent } from './create-aux.component';
import { UserAccountService } from '../../services/user-account/user-account.service';
import { of, throwError } from 'rxjs';
import {SEND_ERROR} from "../../constants/global.constants";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('CreateAuxComponent', () => {
  let component: CreateAuxComponent;
  let fixture: ComponentFixture<CreateAuxComponent>;
  let userAccountService: jest.Mocked<UserAccountService>;

  beforeEach(async () => {
    userAccountService = {
      createUser: jest.fn(),
    } as unknown as jest.Mocked<UserAccountService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateAuxComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: UserAccountService, useValue: userAccountService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAuxComponent);
    component = fixture.componentInstance;

    component.ngOnInit(); // Inicializa el componente
  });

  it('should create the form with default values', () => {
    expect(component.formAux).toBeTruthy();
    expect(component.formAux.valid).toBeFalsy(); // Debería ser inválido al principio
  });

  it('should display toast message on successful creation', async () => {
    const formData = {
      name: 'John',
      lastName: 'Doe',
      identityDocument: 123456,
      phone: '1234567890',
      birthDate: '2000-01-01',
      email: 'john.doe@example.com',
      password: 'password',
      role: 'AUX_BODEGA'
    };

    // @ts-ignore
    userAccountService.createUser.mockReturnValue(of({ status: 201 }));

    await component.createAux(formData);

    expect(component.typeToastMessage).toBe('success');
    expect(component.toastMessage).toBe('Usuario creado exitosamente');
    expect(component.showToast).toBe(true);
  });

  it('should display error toast message on creation failure', async () => {
    const formData = {
      name: 'John',
      lastName: 'Doe',
      identityDocument: 123456,
      phone: '1234567890',
      birthDate: '2000-01-01',
      email: 'john.doe@example.com',
      password: 'password',
      role: 'AUX_BODEGA'
    };

    userAccountService.createUser.mockReturnValue(throwError(() => new Error('Error')));

    await component.createAux(formData);

    expect(component.typeToastMessage).toBe('error');
    expect(component.toastMessage).toBe(SEND_ERROR);
    expect(component.showToast).toBe(true);
  });

  it('should validate the form fields correctly', () => {
    const nameControl = component.name;
    const lastNameControl = component.lastName;

    // Initially, controls should be invalid
    expect(nameControl.valid).toBe(false);
    expect(lastNameControl.valid).toBe(false);

    // Set valid values
    nameControl.setValue('John');
    lastNameControl.setValue('Doe');

    expect(nameControl.valid).toBe(true);
    expect(lastNameControl.valid).toBe(true);
  });
});
