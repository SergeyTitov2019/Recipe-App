import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from "../recipe.model";
import { RecipeService } from "../../../services/recipe.service";
import { ActivatedRoute, Router } from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = []
  subscription: Subscription = new Subscription()

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      }
    )
    this.recipes = this.recipeService.getRecipes()
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
