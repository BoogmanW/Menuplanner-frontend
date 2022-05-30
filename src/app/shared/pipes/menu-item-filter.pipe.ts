import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from '../models/menu-item';

@Pipe({
  name: 'menuItemFilter'
})
export class MenuItemFilterPipe implements PipeTransform {

  
  transform(menuItems: MenuItem[], menuItemFilter: string): MenuItem[] 
  {
    if (menuItemFilter === null || menuItemFilter.length == 0) return [];
    var menuItemList : MenuItem[];
    menuItemList = menuItems.filter(menuItem => {
      return menuItem.title.toLowerCase().includes(menuItemFilter.toLowerCase())
    })

    //only return 5 items, so we dont overpopulate the picker
    return menuItemList.slice(0,5)
    
  }

}
