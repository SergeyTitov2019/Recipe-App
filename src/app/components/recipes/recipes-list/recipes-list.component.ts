import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../../../services/recipe.service";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  // @Output() recipeWasSelected = new EventEmitter<Recipe>()

  recipes: Recipe[] = []

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()
    console.log(this.recipes[0].description)
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe)
  // }
}
