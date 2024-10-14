import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputTextComponent } from './input-text.component';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTextComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default placeholder text as an empty string', () => {
    expect(component.placeholderText).toBe('');
  });

  it('should bind the placeholderText input to the placeholder attribute', () => {
    component.placeholderText = 'Enter text here';
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.placeholder).toBe('Enter text here');
  });

  it('should bind the idInput input to the id attribute', () => {
    component.idInput = 'test-input';
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.id).toBe('test-input');
  });

  it('should update inputValue when input changes', () => {
    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    // Simular un cambio en el input
    inputElement.value = 'New value';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.inputValue).toBe('New value');
  });

  it('should emit valueChange when input changes', () => {
    jest.spyOn(component.valueChange, 'emit');

    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'Changed value';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.valueChange.emit).toHaveBeenCalledWith('Changed value');
  });
});
