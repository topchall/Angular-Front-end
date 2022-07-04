import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, pipe, retry, throwError} from "rxjs";
import {User} from "../model/user";
import {Technician} from "../model/technician";
import {Business} from "../model/business";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basePath: string = 'http://localhost:3000/api/v1/auth';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application-json',
    })
  }
  constructor(private http: HttpClient) { }
  //api error handling
  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  //sign up
  public signUp(user: Technician): Observable<any>{
    return this.http.post<User>(`${this.basePath}/sign-up`, user)
      .pipe(retry(3), catchError(this.handleError));
  }
  public signUpB(user: Business): Observable<any>{
    return this.http.post<User>(`${this.basePath}/sign-up`, user)
      .pipe(retry(3), catchError(this.handleError));
  }
  //sign in
  public signIn(user: User): Observable<any>{
    return this.http.post<User>(`${this.basePath}/sign-in`, user)
      .pipe(retry(3), catchError(this.handleError));
  }
  // get, set Token
  public setToken(accessToken: string): void{
    localStorage.setItem('accessToken', accessToken);
  }
  public getToken(){
    return localStorage.getItem('accessToken');
  }
  // get, set currentUser
  public setCurrentUser(user: string): void{
    localStorage.setItem('currentUser', user);
  }
  public getCurrentUser(){
    return localStorage.getItem('currentUser');
  }
  //is signed
  get isSignedIn(): boolean{
    return this.getToken() !== null;
  }
  // sign-out
  public signOut(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
  }
  public getValidatedData(_value: string){
    let currentUserString = this.getCurrentUser();
    if (currentUserString) {
      console.log(currentUserString);
      let currentUser = JSON.parse(currentUserString);
      console.log(currentUser[_value]);
      return currentUser[_value];
    } else {
      return null;
    }
  }




}
