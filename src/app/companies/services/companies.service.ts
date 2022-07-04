import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Company} from "../model/company";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  // Companies Endpoint
  basePath = 'http://localhost:3000/api/v1/companies';

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json',
    })
  }
  constructor(private http: HttpClient) { }


  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      // Default Error Handling
      console.log(`An error ocurred ${error.status}, body was: ${error.error}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later.'));
  }

  // Create Company
  create(item: any): Observable<Company> {
    return this.http.post<Company>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get Company by id
  getById(id: any): Observable<Company> {
    return this.http.get<Company>(`${this.basePath}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get all Companies
  getAll(): Observable<Company> {
    return this.http.get<Company>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Update Company by id
  update(id: any, item: any): Observable<Company> {
    return this.http.put<Company>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Delete Company by id
  delete(id: any): Observable<Company> {
    return this.http.delete<Company>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
