import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ChevronLeftComponent } from './shared/icons/chevron-left/chevron-left.component';
import { ChevronRightComponent } from './shared/icons/chevron-right/chevron-right.component';
import { WeekOverviewComponent } from './week-overview/week-overview.component';
import { MenuItemOverviewComponent } from './menu-item-overview/menu-item-overview.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DayComponent } from './day/day.component';
import { AutofocusDirective } from './shared/directives/autofocus.directive';
import { MenuItemFilterPipe } from './shared/pipes/menu-item-filter.pipe';
import { MenuItemPlanModalComponent } from './menu-item-plan-modal/menu-item-plan-modal.component';
import { AbstractModalComponent } from './shared/components/abstract-modal/abstract-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChevronLeftComponent,
    ChevronRightComponent,
    WeekOverviewComponent,
    MenuItemOverviewComponent,
    DayComponent,
    AutofocusDirective,
    MenuItemFilterPipe,
    MenuItemPlanModalComponent,
    AbstractModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [MenuItemFilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
