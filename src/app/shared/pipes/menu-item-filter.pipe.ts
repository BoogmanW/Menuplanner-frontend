import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from '../models/menu-item';

@Pipe({
  name: 'menuItemFilter'
})
export class MenuItemFilterPipe implements PipeTransform {

  transform(menuItems: MenuItem[], menuItemFilter: string): MenuItem[] 
  {
    if (!menuItems) return [];

    if (!menuItemFilter) return menuItems;

    console.log("Filter = " + menuItemFilter)
    console.log(menuItems)

    return menuItems.filter(menuItem => {
      return menuItem.title.includes(menuItemFilter)
    })
  }

}