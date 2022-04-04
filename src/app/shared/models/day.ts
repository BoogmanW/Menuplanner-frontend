import { MenuItem } from "./menu-item";

export class Day {
    
    public id: number
    public date : Date;
    public menu_item?: MenuItem

    constructor(id: number, date: Date, menu_item?: MenuItem)
    {
        this.id = id;
        this.date = date; 
        if (menu_item) this.menu_item = menu_item;
    }

    setMenuItem(pMenuItem: MenuItem)
    {
        this.menu_item = pMenuItem;
    }

}