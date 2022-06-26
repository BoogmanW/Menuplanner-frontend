import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItemPlanModalComponent } from '../menu-item-plan-modal/menu-item-plan-modal.component';
import { DayService } from '../services/day.service';
import { MenuItemService } from '../services/menu-item.service';
import { Day } from '../shared/models/day';
import { MenuItem } from '../shared/models/menu-item';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
})
export class DayComponent implements OnInit {
  @Input() day: Day;

  @ViewChild(MenuItemPlanModalComponent) modal: MenuItemPlanModalComponent;

  showMenuItemPlanModal: boolean;

  constructor(private dayService: DayService, private menuItemService: MenuItemService) {}

  ngOnInit(): void {}

  isToday(): boolean {
    if (!this.day) return false;
    return new Date().toDateString() === this.day.date.toDateString();
  }

  getDateString(): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
    };
    return this.day ? this.day.date.toLocaleDateString(undefined, options) : '';
  }

  getWeekDayShort(): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    return this.day ? this.day.date.toLocaleDateString(undefined, options) : '';
  }

  openMenuItemPlanModal() {
    this.showMenuItemPlanModal = true;
  }

  onMenuItemPlanModalCancel() {
    console.log('modal canceled :(');
    this.showMenuItemPlanModal = false;
  }

  onMenuItemPlanModalConfirm() {
    // todo remove
    console.log('modal confirmed :)');
    this.showMenuItemPlanModal = false;
  }

  private planMenuItem(menuItem: MenuItem) {
    if (!this.day) return;
    this.dayService
      .setMenuItem(this.day.id, {
        date: this.day.date,
        menuItemID: menuItem.id,
      })
      .subscribe();
    this.day.menu_item = menuItem;
    this.menuItemService.updateMenuItems();
  }
}
