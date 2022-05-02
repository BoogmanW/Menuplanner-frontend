import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemPlanModalComponent } from './menu-item-plan-modal.component';

describe('MenuItemPlanModalComponent', () => {
  let component: MenuItemPlanModalComponent;
  let fixture: ComponentFixture<MenuItemPlanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemPlanModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemPlanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
