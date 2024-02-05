import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from "../recipe-routing/recipe-routing.module";
import { RecipesComponent } from "../recipes.component";
import { RecipesListComponent } from "../recipes-list/recipes-list.component";
import { RecipesDetailComponent } from "../recipes-detail/recipes-detail.component";
import { RecipesItemComponent } from "../recipes-list/recipes-item/recipes-item.component";
import { RecipeStartComponent } from "../recipe-start/recipe-start.component";
import { RecipeEditComponent } from "../recipe-edit/recipe-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class RecipesModule { }
