import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardComponent } from './item-card.component';
import {FormBuilder, FormsModule} from "@angular/forms";

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCardComponent ],
      providers: [FormBuilder],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("Inputs component", ()=>{

    it("should recibe inputId", ()=>{
      component.inputId = 1;

      fixture.detectChanges();

      expect(component.inputId).toBe(1);
    });

    it("should give the  inputId", ()=>{
      component.inputId = 1;

      fixture.detectChanges();

      expect(component.inputId).toBe(1);
    });

  });



  describe("modal", ()=>{

    it("should open the modal", ()=>{
      component.openModal();
      expect(component.isModalOpen).toBe(true);
    });

    it("should close the modal", ()=>{
      component.closeModal();
      expect(component.isModalOpen).toBe(false);
    });

  });



  describe('onSubmit', () => {
    beforeEach(() => {
      component.hasRole = true;
      component.formSupply.patchValue({
        supplyItemId: 10,
        supplyQuantity: 5,
      });
    });

    it('should emit formSubmitted when the form is valid and the user has the allowed rol', () => {
      const formSubmittedSpy = jest.spyOn(component.formSubmitted, 'emit');
      component.onSubmit();
      expect(formSubmittedSpy).toHaveBeenCalledWith({
        supplyItemId: 10,
        supplyQuantity: 5,
      });
    });

    it('should reset the form and close the modal when the form will be submited', () => {
      component.onSubmit();
      expect(component.formSupply.valid).toBe(false);
      expect(component.isModalOpen).toBe(false);
    });

    it('should not emit formSubmitted if the form is invalid', () => {
      component.formSupply.patchValue({ supplyQuantity: 0 });
      const formSubmittedSpy = jest.spyOn(component.formSubmitted, 'emit');
      component.onSubmit();
      expect(formSubmittedSpy).not.toHaveBeenCalled();
    });

    it('should not emit formSubmitted when the user has not rol', () => {
      component.hasRole = false;
      const formSubmittedSpy = jest.spyOn(component.formSubmitted, 'emit');
      component.onSubmit();
      expect(formSubmittedSpy).not.toHaveBeenCalled();
    });
  });


  describe('supplyQuantity getter', () => {
    it('should return supplyQuantity value', () => {
      expect(component.supplyQuantity).toBe(component.formSupply.get('supplyQuantity'));
    });
  });


});
