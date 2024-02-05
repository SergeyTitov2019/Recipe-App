import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from "../shopping-list.component";
import { ShoppingEditComponent } from "../shopping-edit/shopping-edit.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import {LoggingService} from "../../../services/logging.service";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    // CommonModule,
    BrowserModule,
    FormsModule,
    // HttpClientModule,
    RouterModule.forChild([
      { path: 'shopping-list', component: ShoppingListComponent },
    ])
  ],
  providers: [LoggingService]

})
export class ShoppingListModule { }
