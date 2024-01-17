import {Injectable, EventEmitter} from '@angular/core';
import {Ingredient} from "../../shared/ingredients.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  // ingredientChanged = new EventEmitter<Ingredient[]>()
  ingredientChanged = new Subject<Ingredient[]>()

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 15),
  ]

  getIngredients(): Ingredient[] {
    return this.ingredients.slice()
  }

  addIngredients(ingredient: Ingredient): void{
    this.ingredients.push(ingredient)
    // this.ingredientChanged.emit(this.ingredients.slice())
    this.ingredientChanged.next(this.ingredients.slice())
  }
}
