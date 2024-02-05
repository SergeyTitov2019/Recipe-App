import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {fbApiPostUrl, fbSignInUrl} from "../../../data/sources";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {AuthResponseData} from "../../../types/auth-data";
import {UserModel} from "../../../types/user.model";
import {Router} from "@angular/router";


@Injectable({providedIn: 'root'})
export class AuthService {

  url = fbApiPostUrl
  urlVerifyPass = fbSignInUrl
  // @ts-ignore
  user: BehaviorSubject<any> = new BehaviorSubject<UserModel>(null)

  constructor(private http: HttpClient,
              private router: Router
              ) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.url, {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
      catchError(errorRes => {
        let errorMessage = 'An unknown error occurred!'
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists.'
            break
        }
        switch (errorRes.error.error.message) {
          case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'Password sign-in is disabled for this project.'
            break
        }
        switch (errorRes.error.error.message) {
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'We have blocked all requests from this device due to unusual activity.'
            break
        }
        return throwError(errorMessage)
      }), tap(responseData => {
        const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
        const user = new UserModel(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          expirationDate
        )
        this.user.next(user)
      }))
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.urlVerifyPass, {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
      catchError(errorRes => {
        let errorMessage = 'An unknown error occurred!'
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_NOT_FOUND':
            errorMessage = "There is no user record corresponding to this identifier."
            break
        }
        switch (errorRes.error.error.message) {
          case 'INVALID_PASSWORD':
            errorMessage = 'The password is invalid.'
            break
        }
        switch (errorRes.error.error.message) {
          case 'USER_DISABLED':
            errorMessage = 'The user account has been disabled by an administrator.'
            break
        }
        return throwError(errorMessage)
      }), tap( resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
          )
      }))
  }

  logOut(){
    this.user.next(null)
    this.router.navigate(['auth'])
    localStorage.removeItem('user data')
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new UserModel( email, userId, token, expirationDate )
    this.user.next(user)
    localStorage.setItem( 'user data', JSON.stringify(user))
  }
  private handleError(errorRes: HttpErrorResponse) {
  }

  autoLogin(){
    const userData: {
      email: string
      id: string
      _token: string
      _tokenExpirationDate: string
    } = JSON.parse(<string>localStorage.getItem('user data'))

    if(userData){
      return
    }
    let loadedUser = new UserModel(
      userData["email"],
      userData["id"],
      userData["_token"],
      new Date(userData["_tokenExpirationDate"])
    );
    if(loadedUser.token){
      this.user.next(loadedUser)
    }

  }

}
