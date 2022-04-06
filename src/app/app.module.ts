import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ChevronLeftComponent } from './shared/icons/chevron-left/chevron-left.component';
import { ChevronRightComponent } from './shared/icons/chevron-right/chevron-right.component';
import { WeekOverviewComponent } from './week-overview/week-overview.component';
import { RecipeOverviewComponent } from './recipe-overview/recipe-overview.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DayComponent } from './day/day.component';
import { AutofocusDirective } from './shared/directives/autofocus.directive';
import { MenuItemFilterPipe } from './shared/pipes/menu-item-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    ChevronLeftComponent,
    ChevronRightComponent,
    WeekOverviewComponent,
    RecipeOverviewComponent,
    DayComponent,
    AutofocusDirective,
    MenuItemFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
