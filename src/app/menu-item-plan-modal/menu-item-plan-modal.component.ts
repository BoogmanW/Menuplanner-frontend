import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DayService } from '../services/day.service';
import { MenuItemService } from '../services/menu-item.service';
import { UtilitiesService } from '../services/utilities.service';
import { AbstractModalComponent } from '../shared/components/abstract-modal/abstract-modal.component';
import { Day } from '../shared/models/day';
import { MenuItem } from '../shared/models/menu-item';

@Component({
  selector: 'app-menu-item-plan-modal',
  templateUrl: './menu-item-plan-modal.component.html',
  styleUrls: ['./menu-item-plan-modal.component.css'],
  outputs: [],
})
export class MenuItemPlanModalComponent
  extends AbstractModalComponent
  implements OnInit
{
  @Input() day: Day;
  @Output() onCancel: EventEmitter<void>;

  menuItems: MenuItem[];
  selectedMenuItem: MenuItem;

  menuItemFilterString: string;
  showMenuItemOptions: boolean = false;

  planMenuItemForm = this.formBuilder.group({
    menuItemFilterString: ['', Validators.required],
    time: ['', Validators.required],
    comment: ['', Validators.required],
  });

  constructor(
    private menuItemService: MenuItemService,
    private formBuilder: FormBuilder
  ) {
    super();
    // todo only show menuItemPicker if input is focused
  }

  ngOnInit(): void {
    this.menuItemService.menuItemsChanged$.subscribe((menuItems) => {
      this.menuItems = menuItems;
    });
  }

  selectMenuItem(menuItem: MenuItem) {
    this.selectedMenuItem = menuItem;
  }

  onPlanMenuItemFormSubmit() {
    // todo send post request
  }
}
