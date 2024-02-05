import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredients.model";
import {ShoppingListService} from "./services/shopping-list.service";
import {Subscription} from "rxjs";
import {LoggingService} from "../../services/logging.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers: [LoggingService]

})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = []
  private ingChangeSub: Subscription = new Subscription()

  constructor(private shoppingListService: ShoppingListService,
              private loggingService: LoggingService
              ) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients()
    this.ingChangeSub = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
    this.loggingService.printLog('Hello from ShoppingListComponent')

  }

  ngOnDestroy(): void {
    this.ingChangeSub.unsubscribe()
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index)
  }

  onDeleteItem(index: number) {
    this.shoppingListService.onDelete(index)
  }
}
