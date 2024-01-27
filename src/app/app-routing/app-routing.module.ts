import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "../components/recipes/recipes.component";
import {ShoppingListComponent} from "../components/shoping-list/shopping-list.component";
import {RecipeStartComponent} from "../components/recipes/recipe-start/recipe-start.component";
import {RecipesDetailComponent} from "../components/recipes/recipes-detail/recipes-detail.component";
import {RecipeEditComponent} from "../components/recipes/recipe-edit/recipe-edit.component";
import {RecipeResolverService} from "../services/recipe-resolver.service";
import {AuthComponent} from "../components/auth/auth.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {
        path: ':id',
        component: RecipesDetailComponent,
        resolve: [RecipeResolverService]
      },
      {path: ':id/edit', component: RecipeEditComponent},
    ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
