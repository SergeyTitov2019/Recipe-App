import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../components/recipes/recipe.model";
import { DataStorageService } from "./data-storage.service";
import {Observable} from "rxjs";
import {RecipeService} from "./recipe.service";

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe>{

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService
  ) { }

  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    const recipe = this.recipeService.getRecipes()

    recipe.length === 0 ? this.dataStorageService.fetchRecipes() : recipe

    // if(recipe.length === 0) {
      // return this.dataStorageService.fetchRecipes()
    // } else {
      // return recipe
    // }

  }
}
