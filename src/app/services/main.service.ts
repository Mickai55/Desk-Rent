import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient, private router: Router) {}

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
        console.log('ACCESS DENIED');
      }
      return of(result as T);
    };
  }

  //---------------------------------------------------USER---------------------------------------------------

  getAllUsers() {
    return this.http
      .get('http://localhost:8443/api/users', this.getHeaders())
      .pipe(tap(), catchError(this.handleError('getAllUsers ERROR')));
  }

  register(data: any): Observable<any> {
    return this.http
      .post('http://localhost:8443/api/users/register', data, this.getHeaders())
      .pipe(tap(), catchError(this.handleError('register ERROR')));
  }

  login(data: any): Observable<any> {
    return this.http
      .post('http://localhost:8443/api/users/login', data, this.getHeaders())
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.body.token);
          localStorage.setItem('username', data.username);
          localStorage.setItem('role', response.body.userType.toLowerCase());
        }, catchError(this.handleError('login ERROR')))
      );
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    // remove token too??

    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('username');
    return !(user === null);
  }

  getLoggedUser(username) {
    return this.http
      .post('http://localhost:8443/api/users/getUser', username)
      .pipe(tap(), catchError(this.handleError('getLoggedUser ERROR')));
  }

  updateUser(user) {
    console.log(user);
    return this.http
      .put('http://localhost:8443/api/users/update', user)
      .pipe(tap(), catchError(this.handleError('updateUser ERROR')));
  }

  //---------------------------------------------------DESK---------------------------------------------------

  getDesks() {
    return this.http
      .get('http://localhost:8443/api/desks')
      .pipe(tap(), catchError(this.handleError('getDesks ERROR')));
  }

  getDeskCount() {
    return this.http
      .get('http://localhost:8443/api/desks/count')
      .pipe(tap(), catchError(this.handleError('getDeskCount ERROR')));
  }

  createDesk(desk) {
    return this.http
      .post('http://localhost:8443/api/desks', desk)
      .pipe(tap(), catchError(this.handleError('createDesk ERROR')));
  }

  updateDesk(desk) {
    return this.http
      .put('http://localhost:8443/api/desks', desk)
      .pipe(tap(), catchError(this.handleError('updateDesk ERROR')));
  }

  //---------------------------------------------------CHAIR REQUEST---------------------------------------------------

  getChairRequests() {
    return this.http
      .get('http://localhost:8443/api/chReq')
      .pipe(tap(), catchError(this.handleError('getChairRequests ERROR')));
  }

  addChairRequest(req) {
    return this.http
      .post('http://localhost:8443/api/chReq', req)
      .pipe(tap(), catchError(this.handleError('addChairRequest ERROR')));
  }

  updateChairRequest(req) {
    return this.http
      .put('http://localhost:8443/api/chReq/update', req)
      .pipe(tap(), catchError(this.handleError('updateChairRequest ERROR')));
  }

  //---------------------------------------------------RENT REQUEST---------------------------------------------------

  getRentRequests() {
    return this.http
      .get('http://localhost:8443/api/rentReq')
      .pipe(tap(), catchError(this.handleError('getRentRequests ERROR')));
  }

  addRentRequest(req) {
    return this.http
      .post('http://localhost:8443/api/rentReq', req)
      .pipe(tap(), catchError(this.handleError('addRentRequest ERROR')));
  }

  updateRentRequest(req) {
    return this.http
      .put('http://localhost:8443/api/rentReq/update', req)
      .pipe(tap(), catchError(this.handleError('updateRentRequest ERROR')));
  }
}
