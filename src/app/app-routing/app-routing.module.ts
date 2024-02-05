import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "../components/auth/auth.component";
import { HomeComponent } from "../components/home/home.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () => import('../components/recipes/recipes-module/recipes.module')
      .then(m => m.RecipesModule)
  },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
