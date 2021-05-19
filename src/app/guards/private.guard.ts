import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from '../services/main.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateGuard implements CanActivate {
  user;

  constructor(private mainService: MainService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      this.mainService
        .getLoggedUser(localStorage.getItem('username'))
        .subscribe(
          (response) => {
            this.user = JSON.parse(JSON.stringify(response));
            if (this.user.userType === 'ADMIN') {
              resolve(true);
            } else {
              this.router.navigate(['/rent']);
              resolve(false);
            }
          },
          (err) => {
            console.error(err);
            reject(false);
          }
        );
    });
  }
}
