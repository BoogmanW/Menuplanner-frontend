import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from '../shared/models/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  menuItemsChanged$ = new BehaviorSubject<MenuItem[]>([]);

  constructor(private http: HttpClient) 
  { 
    this.getMenuItems().subscribe(menuItems => {
      this.menuItemsChanged$.next(menuItems);
    })
  }

  updateMenuItems()
  {
    console.log("updating menu items")
    this.getMenuItems().subscribe(menuItems => {
      this.menuItemsChanged$.next(menuItems)
    })
  }
  
  createMenuItem(pMenuItemProperties: {title: string, description: string, category: string}) : Observable<MenuItem>
  {
    return this.http.post<MenuItem>("http://localhost:8000/api/menu-items", pMenuItemProperties)
  }

  editMenuItem(pMenuItemProperties: {id: number, title: string, description: string, category: string}) : Observable<MenuItem>
  {
    return this.http.post<MenuItem>("http://localhost:8000/api/menu-items/" + pMenuItemProperties.id, pMenuItemProperties)
  }

  deleteMenuItem(pMenuItemID: number)
  {
    console.log("deleting menuItem with id " + pMenuItemID)
    return this.http.delete<void>("http://localhost:8000/api/menu-items/" + pMenuItemID)
  }
  
  private getMenuItems() : Observable<MenuItem[]>
  {
    console.log("fetching MenuItems...")
    return this.http.get<MenuItem[]>("http://localhost:8000/api/menu-items").pipe(map( response => {
      return response.map(response => {
        return new MenuItem(response.id, response.title, response.description, response.category)
      })
    }))
  }

}
