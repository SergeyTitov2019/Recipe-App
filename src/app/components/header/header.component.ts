import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from "../../services/data-storage.service";
import { AuthService } from "../auth/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() featureSelect = new EventEmitter<string>()
  private userSub: Subscription = new Subscription()
  isAuthenticated = false

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService
              ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
    })
  }

  onSelect(feature: string) {
    // this.featureSelect.emit(feature)
  }

  onSaveData() {
    this.dataStorageService.storeRecipe()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  onLogOut() {
    this.authService.logOut()
    this.isAuthenticated = false

  }
}


