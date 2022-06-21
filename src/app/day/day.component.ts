import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItemPlanModalComponent } from '../menu-item-plan-modal/menu-item-plan-modal.component';
import { DayService } from '../services/day.service';
import { MenuItemService } from '../services/menu-item.service';
import { ModalService } from '../services/modal.service';
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

  commentInput: string;
  MENUITEM_PLAN_MODAL: string = 'menuItemPlanModal';

  constructor(
    private dayService: DayService,
    private menuItemService: MenuItemService,
    private modalService: ModalService
  ) {}

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
    this.modalService.showModal(this.MENUITEM_PLAN_MODAL);
  }

  closeMenuItemPlanModal() {
    this.modalService.cancelModal(this.MENUITEM_PLAN_MODAL);
  }

  onMenuItemPlanModalCancel() {
    // todo remove
    console.log('modal canceled :(');
    this.closeMenuItemPlanModal();
  }

  onMenuItemPlanModalConfirm() {
    // todo remove
    console.log('modal confirmed :)');
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
