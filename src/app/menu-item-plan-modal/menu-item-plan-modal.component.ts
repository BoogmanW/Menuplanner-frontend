import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MenuItemService } from '../services/menu-item.service';
import { Day } from '../shared/models/day';
import { MenuItem } from '../shared/models/menu-item';
import { MenuItemFilterPipe } from '../shared/pipes/menu-item-filter.pipe';

@Component({
  selector: 'app-menu-item-plan-modal',
  templateUrl: './menu-item-plan-modal.component.html',
  styleUrls: ['./menu-item-plan-modal.component.css'],
  outputs: [],
})
export class MenuItemPlanModalComponent implements OnInit {
  @Input() day: Day;

  @ViewChild('menuItemInput') menuItemInput: ElementRef;

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  allMenuItems: MenuItem[];
  filteredMenuItems: MenuItem[];
  selectedMenuItem?: MenuItem;
  menuItemInputSubscription: Subscription;

  menuItemFilterString: string;
  showMenuItemPicker: boolean;

  selectedMenuItemIndex: number;

  planMenuItemForm = this.formBuilder.group({
    menuItem: ['', Validators.required],
    time: ['', Validators.required],
    comment: ['', Validators.required],
  });

  constructor(
    private menuItemService: MenuItemService,
    private formBuilder: FormBuilder,
    private menuItemFilterPipe: MenuItemFilterPipe
  ) {}

  ngOnInit(): void {
    this.menuItemService.menuItemsChanged$.subscribe((menuItems) => {
      this.allMenuItems = menuItems;
    });
  }

  @HostListener('window:keydown.ArrowDown')
  handleKeyDown() {
    if (!this.showMenuItemPicker) return;
    if (this.selectedMenuItemIndex == this.filteredMenuItems.length - 1) return;
    this.selectedMenuItemIndex++;
  }

  @HostListener('window:keydown.ArrowUp')
  handleKeyUp() {
    if (!this.showMenuItemPicker) return;
    if (this.selectedMenuItemIndex == -1) return;
    this.selectedMenuItemIndex--;
  }

  @HostListener('window:keydown.Enter')
  handleKeyEnter() {
    if (!this.showMenuItemPicker) return;

    if (this.filteredMenuItems[this.selectedMenuItemIndex]) {
      this.selectMenuItem(this.filteredMenuItems[this.selectedMenuItemIndex]);
    }
  }

  @HostListener('window:keydown.Escape')
  handleKeyEscape() {
    this.menuItemInput.nativeElement.blur();
  }

  onMenuItemFocused($event: any) {
    this.menuItemInputSubscription = this.planMenuItemForm.controls['menuItem'].valueChanges.subscribe((value) => {
      this.filteredMenuItems = this.menuItemFilterPipe.transform(this.allMenuItems, value);
    });
    $event.target.select();

    this.showMenuItemPicker = true;
    this.selectedMenuItemIndex = -1;

    console.log($event.target);
  }

  onMenuItemBlurred() {
    this.planMenuItemForm.patchValue({ menuItem: this.selectedMenuItem?.title });
    this.showMenuItemPicker = false;
    this.menuItemInputSubscription.unsubscribe();
  }

  selectMenuItem(menuItem: MenuItem) {
    this.selectedMenuItem = menuItem;
    this.planMenuItemForm.patchValue({ menuItem: this.selectedMenuItem?.title });
    this.menuItemInput.nativeElement.blur();
  }

  onConfirmClicked() {
    console.log('confirm clicked');
    this.confirm.emit();
  }

  onCancelClicked(): void {
    console.log('cancel clicked');
    this.cancel.emit();
  }

  onPlanMenuItemFormSubmit() {}
}
