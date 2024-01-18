import {Component, Input, OnInit, EventEmitter, Output, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {Ingredient} from "../../shared/ingredients.model";
import {ShoppingListService} from "../services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('_form') shoppingListForm?: NgForm

  subscription: Subscription = new Subscription()
  editMode = false
  editedItemIndex!: number
  editedItem: Ingredient | undefined


  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index
          this.editMode = true
          this.editedItem = this.shoppingListService.getIngredient(index)
          console.log(this.editedItem )
          this.shoppingListForm?.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          })
        }
      )
  }

  onAddItem(form: NgForm):void {
    const newIngredient = new Ingredient(form.value.name, form.value.amount)
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
      this.editMode = !this.editMode
      form.reset()
    }else{
      this.shoppingListService.addIngredient(newIngredient)
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onReset() {
    this.shoppingListForm?.reset()
    this.editMode = false
  }

  onDelete() {
    this.shoppingListService.onDelete(this.editedItemIndex)
    this.shoppingListForm?.reset()
    this.editMode = false

  }
}
