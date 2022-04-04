import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeOverviewComponent } from './recipe-overview/recipe-overview.component';
import { WeekOverviewComponent } from './week-overview/week-overview.component';

const routes: Routes = [
  {path: '', component: WeekOverviewComponent },
  {path: 'recipes', component: RecipeOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
