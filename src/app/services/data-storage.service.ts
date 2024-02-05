import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { RecipeService } from "./recipe.service";
import { firebaseUrl } from "../data/sources";
import { Recipe } from "../components/recipes/recipe.model";
import { map, take, tap, exhaustMap } from "rxjs/operators";
import {AuthService} from "../components/auth/services/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  baseUrl = firebaseUrl

  constructor( private http: HttpClient,
               private recipeService: RecipeService,
               private authService: AuthService
  ) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipes()
    return this.http.put(this.baseUrl, recipes)
      .subscribe(response => { console.log('PUT response',response) })
  }

  // fetchRecipes(){
  //   return this.authService.user.pipe(take(1), exhaustMap((user: any) => {
  //       return this.http
  //       .get<Recipe[]>(this.baseUrl, {
  //         params: new HttpParams().set('auth', user.token)
  //       })
  //   }),
  //     map(recipe => {
  //       return recipe.map( recipe => {
  //         return {
  //           ...recipe,
  //           ingredients: recipe.ingredients ? recipe.ingredients : []
  //         }
  //       })
  //     }),
  //     tap(recipe => {
  //       console.log(recipe);
  //       this.recipeService.setRecipe(recipe)
  //     })
  //     )
  // }

  fetchRecipes(){
        return this.http
        .get<Recipe[]>(this.baseUrl)
          .pipe(
            map(recipe => {
              return recipe.map( recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                }
              })
            }),
            tap(recipe => {
              console.log(recipe);
              this.recipeService.setRecipe(recipe)
            })
          )
  }

}
