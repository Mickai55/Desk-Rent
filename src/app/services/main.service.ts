import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }
  
  getHeaders() {
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
      withCredentials: false,
    };
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      if (error.status == 401) {
        console.log('NU MAI AI ACCES!');
      }
      return of(result as T);
    };
  }

  registerDemoAPI(data: any): Observable<any> {
    return this.http
      .post('http://localhost:3000/users/register', data, this.getHeaders())
      .pipe(
        tap((response) => console.log(response)),
        catchError(this.handleError('registerDemoAPI'))
      );
  }

  login(data: any): Observable<any> {
    return this.http
      .post('http://localhost:3000/users/login', data, this.getHeaders())
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
        })
      );
  }
}
