import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../shared/ingredients.model";
import {ShoppingListService} from "./services/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{

  // ingredients: Ingredient[] = [
  //   new Ingredient('Apple', 5),
  //   new Ingredient('Tomatoes', 15),
  // ]

  ingredients: Ingredient[] = []

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients()
    this.shoppingListService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
  }

  // onIngredientAdded(ingredient: Ingredient){
    // this.ingredients.push(ingredient)
    // console.log(ingredient)
  // }

}
