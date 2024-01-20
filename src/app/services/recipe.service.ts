import {Injectable, EventEmitter} from '@angular/core';
import {Recipe} from "../components/recipes/recipe.model";
import {ShoppingListService} from "../components/shoping-list/services/shopping-list.service";
import {Subject} from "rxjs";
import {recipeList} from "../data/data.recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new Subject<Recipe>()
  recipeChanged = new Subject<Recipe[]>()

  private recipes: Recipe[] = recipeList

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice()
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: any): void {
    this.shoppingListService.addIngredient(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
  }

  deleteIngredients(index: number) {
    this.recipes.splice(index, 1)
    this.recipeChanged.next(this.recipes.slice())
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipeChanged.next(this.recipes.slice())
  }

}
