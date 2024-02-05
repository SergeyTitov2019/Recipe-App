import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from "../services/recipe.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../components/auth/auth.interceptor";
import { LoggingService } from "../services/logging.service";

@NgModule({
  declarations: [],
  providers: [
    RecipeService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LoggingService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {}
