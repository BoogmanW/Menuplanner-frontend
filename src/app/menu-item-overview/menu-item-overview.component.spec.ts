import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemOverviewComponent } from './menu-item-overview.component';

describe('MenuItemOverviewComponent', () => {
  let component: MenuItemOverviewComponent;
  let fixture: ComponentFixture<MenuItemOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
