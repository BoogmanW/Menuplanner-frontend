import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuItemService } from '../services/menu-item.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { MenuItemPlanModalComponent } from './menu-item-plan-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuItemFilterPipe } from '../shared/pipes/menu-item-filter.pipe';
import { By } from '@angular/platform-browser';

describe('MenuItemPlanModalComponent', () => {
  let component: MenuItemPlanModalComponent;
  let fixture: ComponentFixture<MenuItemPlanModalComponent>;
  let menuItemService: MenuItemService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemPlanModalComponent, MenuItemFilterPipe ],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemPlanModalComponent);
    component = fixture.componentInstance;
    menuItemService = fixture.debugElement.injector.get(MenuItemService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three inputs', () => {
    expect(fixture.debugElement.queryAll(By.css('input'))).toHaveSize(3);
  })
});
