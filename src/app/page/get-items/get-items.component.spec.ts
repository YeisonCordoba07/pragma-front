import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetItemsComponent } from './get-items.component';
import { of, throwError } from 'rxjs';
import { ItemService } from '../../services/item/item.service';
import { LoginService } from '../../services/auth/login.service';
import { SupplyService } from '../../services/supply/supply.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GetItemsComponent', () => {
  let component: GetItemsComponent;
  let fixture: ComponentFixture<GetItemsComponent>;
  let itemServiceMock: any;
  let loginServiceMock: any;
  let supplyServiceMock: any;

  beforeEach(async () => {
    itemServiceMock = {
      getItem: jest.fn(),
    };
    loginServiceMock = {
      currentUserIsLogin: of(true),
      currentLoginData: of({ email: 'example@gmail.com', role: 'AUX_BODEGA' }),
      getSessionToken: jest.fn(),
    };
    supplyServiceMock = {
      addSupply: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [GetItemsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ItemService, useValue: itemServiceMock },
        { provide: LoginService, useValue: loginServiceMock },
        { provide: SupplyService, useValue: supplyServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(GetItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hasRole to true if userLoginData.role is "AUX_BODEGA"', () => {
    component.userLoginData = { email: 'example@gmail.com', role: 'AUX_BODEGA' };
    component.ngOnInit();
    expect(component.hasRole).toBe(true);
  });

  it('should load items on init', async () => {
    const mockResponse = {
      content: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }],
      page: 0,
      size: 5,
      totalElements: 2,
      totalPages: 1,
    };
    itemServiceMock.getItem.mockReturnValue(of(mockResponse));

    await component.loadItems();

    expect(itemServiceMock.getItem).toHaveBeenCalledWith(
      component.page, component.size, component.orderBy, component.ascending
    );
    expect(component.itemData).toEqual(mockResponse.content);
    expect(component.page).toBe(mockResponse.page);
    expect(component.size).toBe(mockResponse.size);
    expect(component.totalElements).toBe(mockResponse.totalElements);
    expect(component.totalPages).toBe(mockResponse.totalPages);
  });

  it('should handle error when loading items', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    itemServiceMock.getItem.mockReturnValue(throwError(() => new Error('Service error')));

    await component.loadItems();

    expect(consoleSpy).toHaveBeenCalledWith('Error al obtener articulos:', expect.any(Error));
  });

  it('should decrease page and reload items when prevPage is called', async () => {
    component.page = 1;
    const loadItemsSpy = jest.spyOn(component, 'loadItems');

    component.prevPage();

    expect(component.page).toBe(0);
    expect(loadItemsSpy).toHaveBeenCalled();
  });

  it('should not decrease page if already on the first page', async () => {
    component.page = 0;
    const loadItemsSpy = jest.spyOn(component, 'loadItems');

    component.prevPage();

    expect(component.page).toBe(0);
    expect(loadItemsSpy).not.toHaveBeenCalled();
  });

  it('should increase page and reload items when nextPage is called', async () => {
    component.page = 0;
    component.totalPages = 2;
    const loadItemsSpy = jest.spyOn(component, 'loadItems');

    component.nextPage();

    expect(component.page).toBe(1);
    expect(loadItemsSpy).toHaveBeenCalled();
  });

  it('should not increase page if already on the last page', async () => {
    component.page = 1;
    component.totalPages = 2;
    const loadItemsSpy = jest.spyOn(component, 'loadItems');

    component.nextPage();

    expect(component.page).toBe(1);
    expect(loadItemsSpy).not.toHaveBeenCalled();
  });

  it('should toggle ascending order and reload items when changeAscending is called', async () => {
    const loadItemsSpy = jest.spyOn(component, 'loadItems');

    component.ascending = true;
    component.changeAscending();

    expect(component.ascending).toBe(false);
    expect(loadItemsSpy).toHaveBeenCalled();
  });

  it('should change orderBy value and reload items when changeAscending2 is called', async () => {
    const loadItemsSpy = jest.spyOn(component, 'loadItems');

    component.changeAscending2('newOrder');

    expect(component.orderBy).toBe('newOrder');
    expect(loadItemsSpy).toHaveBeenCalled();
  });


  it('should create newSupply object and call addSupply on supplyService', async () => {
    const formData = { supplyItemId: 1, supplyQuantity: 10 };
    const newSupply = { idItem: formData.supplyItemId, quantity: formData.supplyQuantity };
    supplyServiceMock.addSupply.mockReturnValue(of({ success: true }));
    const loadItemsSpy = jest.spyOn(component, 'loadItems');

    await component.addSupply(formData);

    expect(supplyServiceMock.addSupply).toHaveBeenCalledWith(newSupply);
    expect(loadItemsSpy).toHaveBeenCalled();
  });

});
