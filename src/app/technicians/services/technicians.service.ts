import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";
import { Technician } from "../model/technician";

@Injectable({
  providedIn: 'root'
})
export class TechniciansService {
  // Technicians Endpoint
  basePath = 'http://localhost:3000/api/v1/technicians';

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

  // Create Technician
  create(item: any): Observable<Technician> {
    return this.http.post<Technician>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get Technician by id
  getById(id: any): Observable<Technician> {
    return this.http.get<Technician>(`${this.basePath}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get all Technicians
  getAll(): Observable<Technician> {
    return this.http.get<Technician>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Update Technician by id
  update(id: any, item: any): Observable<Technician> {
    return this.http.put<Technician>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Delete Technician by id
  delete(id: any): Observable<Technician> {
    return this.http.delete<Technician>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
