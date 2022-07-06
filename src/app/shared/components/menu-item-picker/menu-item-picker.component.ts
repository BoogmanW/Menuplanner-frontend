import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MenuItem } from '../../models/menu-item';
import { MenuItemFilterPipe } from '../../pipes/menu-item-filter.pipe';

@Component({
  selector: 'app-menu-item-picker',
  templateUrl: './menu-item-picker.component.html',
  styleUrls: ['./menu-item-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MenuItemPickerComponent,
    },
  ],
})
export class MenuItemPickerComponent implements OnInit, ControlValueAccessor {
  @Input() allMenuItems: MenuItem[];

  // dropdown picker properties
  menuItemInputSubscription: Subscription;
  menuItem: MenuItem;
  filteredMenuItems: MenuItem[];
  showMenuItemPicker: boolean;
  selectedMenuItemIndex: number;
  menuItemInputValue: string;
  @ViewChild('menuItemInput') menuItemInput: ElementRef;

  constructor(private menuItemFilterPipe: MenuItemFilterPipe) {}

  ngOnInit(): void {
    this.filteredMenuItems = this.allMenuItems;
  }

  // controlValueAccessor properties
  onChange = (menuItem: MenuItem) => {};
  onTouch = () => {};
  touched = false;
  disabled = false;

  // controlValueAccessor methods
  writeValue(menuItem: MenuItem): void {
    console.log('writeValue -> ' + menuItem);
    this.menuItem = menuItem;
    this.menuItemInputValue = menuItem.title;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouch: any): void {
    this.onTouch = onTouch;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }

  // dropdown picker methods
  @HostListener('window:keydown.ArrowDown')
  handleKeyDown() {
    if (!this.showMenuItemPicker) return;
    if (this.selectedMenuItemIndex == this.filteredMenuItems.length - 1) return;
    this.selectedMenuItemIndex++;
  }

  @HostListener('window:keydown.ArrowUp')
  handleKeyUp() {
    if (!this.showMenuItemPicker) return;
    if (this.selectedMenuItemIndex == 0) return;
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

  onInputFocused($event: any) {
    this.showMenuItemPicker = true;
    this.selectedMenuItemIndex = -1;
    $event.target.select();
  }

  onInputBlurred() {
    this.showMenuItemPicker = false;
  }

  // this will prevent blurring the input when selecting a menu item. this way, we can select the menu Item first and then blur the input manually in selectMenuItem()
  onMouseDownMenuItem($event: MouseEvent) {
    $event.preventDefault();
  }

  // the MenuItemFilterPipe needs to be triggered manually to respond to every keystroke
  onInputChanged(inputValue: string) {
    this.filteredMenuItems = this.menuItemFilterPipe.transform(this.allMenuItems, inputValue);
  }

  selectMenuItem(menuItem: MenuItem) {
    this.onChange(menuItem);

    // onChange will push the selected MenuItem to the formControl but will not trigger our writeValue(), so we have to set menuItemInputValue ourselves.
    this.menuItemInputValue = menuItem.title;

    this.menuItemInput.nativeElement.blur();
    this.showMenuItemPicker = false;
  }
}
