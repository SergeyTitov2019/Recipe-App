import {Component, Input, OnInit, EventEmitter, Output, ViewChild, ElementRef} from '@angular/core';
import {Ingredient} from "../../shared/ingredients.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef!: ElementRef
  @ViewChild('amountInput') amountInputRef!: ElementRef
  @Output() ingredientAdded = new EventEmitter<Ingredient>()

  // @Output() contextItem = new EventEmitter<{name: string, amount: number}>()
  // newContextItemName = '';
  // newContextItemAmount = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value
    const ingAmount = this.amountInputRef.nativeElement.value
    const newIngredient = new Ingredient(ingName, ingAmount)
    this.ingredientAdded.emit(newIngredient)
  }

}
