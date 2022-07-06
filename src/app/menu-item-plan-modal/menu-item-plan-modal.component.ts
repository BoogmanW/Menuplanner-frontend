import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DayService } from '../services/day.service';
import { MenuItemService } from '../services/menu-item.service';
import { Day } from '../shared/models/day';
import { MenuItem } from '../shared/models/menu-item';

@Component({
  selector: 'app-menu-item-plan-modal',
  templateUrl: './menu-item-plan-modal.component.html',
  styleUrls: ['./menu-item-plan-modal.component.css'],
  outputs: [],
})
export class MenuItemPlanModalComponent implements OnInit {
  @Input() day: Day;

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  allMenuItems: MenuItem[];

  planMenuItemForm = this.formBuilder.group({
    menuItem: ['', Validators.required],
    time: ['', Validators.required],
    comment: ['', Validators.required],
  });

  constructor(
    private menuItemService: MenuItemService,
    private formBuilder: FormBuilder,
    private dayService: DayService
  ) {}

  ngOnInit(): void {
    this.menuItemService.menuItemsChanged$.subscribe((menuItems) => {
      this.allMenuItems = menuItems;
    });
  }

  onConfirmClicked() {
    console.log('confirm clicked');
    if (!this.day) return;
    this.dayService
      .updateDay(this.day.id, {
        date: this.day.date,
        menuItemID: this.planMenuItemForm.value['menuItem'].id,
        time: this.planMenuItemForm.value['time'],
        comment: this.planMenuItemForm.value['comment'],
      })
      .subscribe();
    // set properties on local day to see changes immediately
    this.day.menu_item = this.planMenuItemForm.value['menuItem'];
    this.day.time = this.planMenuItemForm.value['time'];
    this.day.comment = this.planMenuItemForm.value['comment'];
    this.menuItemService.updateMenuItems();
    this.confirm.emit();
  }

  onCancelClicked(): void {
    console.log('cancel clicked');
    this.cancel.emit();
  }

  onPlanMenuItemFormSubmit() {}
}
