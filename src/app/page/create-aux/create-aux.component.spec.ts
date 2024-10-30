import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
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







  it('should return the form control for name', () => {
    const control = component.name;
    expect(control).toBe(component.formAux.get('name'));
  });

  it('should return the form control for lastName', () => {
    const control = component.lastName;
    expect(control).toBe(component.formAux.get('lastName'));
  });

  it('should return the form control for identityDocument', () => {
    const control = component.identityDocument;
    expect(control).toBe(component.formAux.get('identityDocument'));
  });

  it('should return the form control for phone', () => {
    const control = component.phone;
    expect(control).toBe(component.formAux.get('phone'));
  });

  it('should return the form control for birthDate', () => {
    const control = component.birthDate;
    expect(control).toBe(component.formAux.get('birthDate'));
  });

  it('should return the form control for email', () => {
    const control = component.email;
    expect(control).toBe(component.formAux.get('email'));
  });

  it('should return the form control for password', () => {
    const control = component.password;
    expect(control).toBe(component.formAux.get('password'));
  });

  it('should return the form control for role', () => {
    const control = component.role;
    expect(control).toBe(component.formAux.get('role'));
  });



  it('should show toast message and set showToast to true', () => {
    component.showCustomToast('Test Message');

    expect(component.toastMessage).toBe('Test Message'); // Verifica que se haya establecido el mensaje
    expect(component.showToast).toBe(true); // Verifica que showToast sea verdadero
  });






  it('should return null if age is greater than 18', () => {
    const control = new FormControl('2000-01-01'); // Fecha de nacimiento (23 años)
    const result = component.adultValidator(control);
    expect(result).toBeNull(); // Es mayor de edad
  });

  it('should return null if age is exactly 18 and monthDiff > 0', () => {
    const control = new FormControl(new Date(new Date().getFullYear() - 18, 1, 1).toISOString().split('T')[0]); // Cumpleaños en enero, hoy es marzo
    const result = component.adultValidator(control);
    expect(result).toBeNull(); // Es mayor de edad
  });

  it('should return null if age is exactly 18 and monthDiff === 0 and dayDiff >= 0', () => {
    const today = new Date();
    const control = new FormControl(new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0]); // Cumpleaños hoy
    const result = component.adultValidator(control);
    expect(result).toBeNull(); // Es mayor de edad
  });


  it('should set showToast to false after 5 seconds', fakeAsync(() => {
    component.showCustomToast('Test message'); // Llama al método para mostrar el toast
    expect(component.showToast).toBe(true); // Verifica que showToast sea verdadero inicialmente

    tick(5000); // Simula el paso de 5 segundos

    expect(component.showToast).toBe(false); // Verifica que showToast se haya vuelto falso
  }));


});
