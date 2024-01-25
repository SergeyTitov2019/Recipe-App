import {Component, EventEmitter, Output} from '@angular/core';
import {DataStorageService} from "../../services/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() featureSelect = new EventEmitter<string>()

  constructor(private dataStorageService: DataStorageService) {}

  onSelect(feature: string) {
    this.featureSelect.emit(feature)
  }

  onSaveData() {
    this.dataStorageService.storeRecipe()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }
}


