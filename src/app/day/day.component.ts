import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DayService } from '../services/day.service';
import { MenuItemService } from '../services/menu-item.service';
import { UtilitiesService } from '../services/utilities.service';
import { Day } from '../shared/models/day';
import { MenuItem } from '../shared/models/menu-item';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() day?: Day;

  @ViewChildren('menuItemPickerFilterField') menuItemPickerFilterField? : QueryList<ElementRef>

  menuItemPickerOpened = false;
  menuItems : MenuItem[] = [];

  constructor(private menuItemService: MenuItemService, private dayService: DayService, private utilitiesService : UtilitiesService) { }

  ngOnInit(): void {
    this.menuItemService.menuItemsChanged$.subscribe(menuItems => {
      console.log("menu items changed")
      this.menuItems = menuItems;
    })

    this.menuItemPickerFilterField?.changes.subscribe(() => {
      console.log("change seen")
      this.menuItemPickerFilterField?.first.nativeElement.focus()
    })
    //this.setupEventListeners()
  }

  isToday(): boolean
  {
    if (!this.day) return false;
    return new Date().toDateString() === this.day.date.toDateString();
  }

  getDateString(): string
  {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long'};
    return this.day? this.day.date.toLocaleDateString(undefined, options) : "";
  }

  getWeekDayShort(): string
  {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short'};
    return this.day ? this.day.date.toLocaleDateString(undefined, options): "";
  }

  planMenuItem(menuItem: MenuItem)
  {
    if (!this.day) return;
    this.dayService.setMenuItem(this.day.id, {'date': this.day.date, 'menuItemID': menuItem.id}).subscribe()
    this.day.menu_item = menuItem; 
    this.menuItemService.updateMenuItems();
    this.menuItemPickerOpened = false;
  }


  openMenuItemPicker($event: MouseEvent)
  {
    this.menuItemPickerOpened = true
    
    // so clickevent to close picker wouldn't fire immediately
    $event.stopPropagation();
    
    // listen to clickevent, click anywhere should close menuItemPicker
    this.utilitiesService.documentClickedTarget$.subscribe(() => {
        this.menuItemPickerOpened = false;
    })
  }
}
