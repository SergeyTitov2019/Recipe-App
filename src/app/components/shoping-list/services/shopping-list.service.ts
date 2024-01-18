import {Injectable, EventEmitter} from '@angular/core';
import {Ingredient} from "../../shared/ingredients.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 15),
    new Ingredient('Dates', 250),
  ]

  getIngredient(index: number) {
    return this.ingredients[index]
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient)
    this.ingredientChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients)
    this.ingredientChanged.next(this.ingredients.slice())
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient
    this.ingredientChanged.next(this.ingredients.slice())
  }

  onDelete(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice())
  }

}
