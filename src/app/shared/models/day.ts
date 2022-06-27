import { Time } from '@angular/common';
import { MenuItem } from './menu-item';

export class Day {
  public id: number;
  public date: Date;
  public menu_item?: MenuItem;
  public time?: Time;
  public comment?: string;

  constructor(id: number, date: Date, menu_item?: MenuItem, time?: Time, comment?: string) {
    this.id = id;
    this.date = date;
    if (menu_item) this.menu_item = menu_item;
    if (time) this.time = time;
    if (comment) this.comment = comment;
  }

  setMenuItem(pMenuItem: MenuItem) {
    this.menu_item = pMenuItem;
  }

  setComment(pComment: string) {
    this.comment = pComment;
  }

  setTime(pTime: Time) {
    this.time = pTime;
  }
}
