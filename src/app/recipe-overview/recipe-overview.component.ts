import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItemService } from '../services/menu-item.service';
import { MenuItem } from '../shared/models/menu-item';

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.css']
})
export class RecipeOverviewComponent implements OnInit {

  createMenuItemForm = this.formBuilder.group({
    "title": ["", Validators.required],
    "description": ["", Validators.required],
    "category": ["", Validators.required]
  })

  editMenuItemForm = this.formBuilder.group({
    "title": [this.editingMenuItem?.title, Validators.required],
    "description": [this.editingMenuItem?.description, Validators.required],
    "category": [this.editingMenuItem?.category, Validators.required]
  })

  editingMenuItem?: MenuItem

  menuItems: MenuItem[] = []; 

  constructor(private formBuilder: FormBuilder, private menuItemService: MenuItemService) { }

  ngOnInit(): void {
    this.menuItemService.menuItemsChanged$.subscribe(menuItems => this.menuItems = menuItems);
    //this.menuItemService.getMenuItems();
  }

  onCreateMenuItemFormSubmit()
  {
    this.menuItemService.menuItemsChanged$.next([...this.menuItems, this.createMenuItemForm.value])

    this.menuItemService.createMenuItem(this.createMenuItemForm.value).subscribe(() => {
      this.menuItemService.updateMenuItems()
    })
    this.createMenuItemForm.reset();
  }

  onEditMenuItemClicked(pMenuItem: MenuItem)
  {
    this.editingMenuItem = pMenuItem;
    this.editMenuItemForm.patchValue(pMenuItem)
  }

  onDeleteMenuItemClicked(pMenuItem : MenuItem)
  {
    const index = this.menuItems.indexOf(pMenuItem)
    if (index > -1)
    {
      this.menuItems.splice(index, 1)
    }

    this.menuItemService.deleteMenuItem(pMenuItem.id).subscribe( () => {
      this.menuItemService.updateMenuItems()
    });
  }

  onEditMenuItemFormSubmit()
  {
    if (!this.editingMenuItem) return
    
    this.editingMenuItem.title = this.editMenuItemForm.value["title"]
    this.editingMenuItem.description = this.editMenuItemForm.value["description"]
    this.editingMenuItem.category = this.editMenuItemForm.value["category"]

    this.menuItemService.editMenuItem(this.editingMenuItem).subscribe( () => {
      this.menuItemService.updateMenuItems()
    });

    this.editingMenuItem = undefined; 
  }
}
