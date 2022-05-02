import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemOverviewComponent } from './menu-item-overview/menu-item-overview.component';
import { WeekOverviewComponent } from './week-overview/week-overview.component';

const routes: Routes = [
  {path: '', component: WeekOverviewComponent },
  {path: 'menuitems', component: MenuItemOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
