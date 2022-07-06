import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemPickerComponent } from './menu-item-picker.component';

describe('MenuItemPickerComponent', () => {
  let component: MenuItemPickerComponent;
  let fixture: ComponentFixture<MenuItemPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
