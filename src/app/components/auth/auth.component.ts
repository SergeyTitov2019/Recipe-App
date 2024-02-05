import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {Observable, Subscription} from "rxjs";
import {AuthResponseData} from "../../types/auth-data";
import {Router} from "@angular/router";
import {AlertComponent} from "../alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true
  isLoading: boolean = false
  error: string | null = null
  @ViewChild(PlaceholderDirective) alertHost?: PlaceholderDirective

  private closeSub: Subscription = new Subscription()

  constructor(private authService: AuthService,
              private router: Router,
              private cmpFactoryResolver: ComponentFactoryResolver
  ) {
  }

  onSwitchModel() {
    this.isLoginMode = !this.isLoginMode
  }

  ngOnDestroy() {
    if(this.closeSub){
      this.closeSub.unsubscribe()
    }
  }

  onSubmit(form: NgForm) {
    const email = form.value.email
    const password = form.value.password
    let authObs: Observable<AuthResponseData> = new Observable<AuthResponseData>()

    if (!form.valid) {
      return
    }
    this.isLoading = true
    if (this.isLoginMode) {
      authObs = this.authService.logIn(email, password)
    } else {
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe(resData => {
      this.isLoading = false
      this.router.navigate(['./recipes'])
    }, errorMessage => {
      console.log(errorMessage)
      this.showErrorAlert(errorMessage + '15')
      this.error = errorMessage
      this.isLoading = false
    })
    form.reset()
  }

  onHandleError() {
    this.error = null
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.cmpFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost?.viewContainerRef
    hostViewContainerRef?.clear()

    const componentRef = hostViewContainerRef?.createComponent(alertCmpFactory)
    // @ts-ignore
    componentRef.instance.message = message
    // @ts-ignore
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe()
      hostViewContainerRef?.clear()
    })

  }
}
