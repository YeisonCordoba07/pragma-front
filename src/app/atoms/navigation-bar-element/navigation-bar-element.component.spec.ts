import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarElementComponent } from './navigation-bar-element.component';

describe('NavigationBarElementComponent', () => {
  let component: NavigationBarElementComponent;
  let fixture: ComponentFixture<NavigationBarElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBarElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBarElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
