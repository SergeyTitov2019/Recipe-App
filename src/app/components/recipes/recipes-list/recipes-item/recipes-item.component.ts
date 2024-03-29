import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../../recipe.model";
import {RecipeService} from "../../../../services/recipe.service";

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  @Input() recipe!: Recipe
  @Input() index!: number
  // @Output() recipeSelected = new EventEmitter<void>()

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
  }

  onSelected() {
    // this.recipeSelected.emit()
    // this.recipeService.recipeSelected.emit(this.recipe)
    this.recipeService.recipeSelected.next(this.recipe)
  }

}
