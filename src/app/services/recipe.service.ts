import {Injectable, EventEmitter} from '@angular/core';
import {Recipe} from "../components/recipes/recipe.model";
import {ShoppingListService} from "../components/shoping-list/services/shopping-list.service";
import {Ingredient} from "../components/shared/ingredients.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>()

  private recipes: Recipe[] = [
    new Recipe('Test Name', 'Test Descr', 'https://www.foodandwine.com/thmb/dX7pNh_WX83ESqb9VJuvkBwVKwM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Braciole-FT-RECIPE1122-66acf49cef0e4390bec780945709e7f3.jpg'),
    new Recipe('Greek Salad', 'Greek Salad Description', 'https://art-lunch.ru/content/uploads/2018/07/Greek_salad_01.jpg'),
  ]

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice()
  }

  getRecipe(index: number){
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: any): void {
    this.shoppingListService.addIngredients(ingredients)
  }

}
