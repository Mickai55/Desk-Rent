import { Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private mainService: MainService) {}
  rentRequests = [];
  user;
  req;
  nr;
  desks;
  isLoggedIn = this.mainService.isUserLoggedIn();
  username = localStorage.getItem('username');
  role;

  ngOnInit() {
    if (localStorage.getItem('username')) {
      this.mainService
        .getLoggedUser(localStorage.getItem('username'))
        .subscribe((response) => {
          this.user = JSON.parse(JSON.stringify(response));
          console.log('user', response);

          this.mainService.getRentRequests().subscribe((response) => {
            this.rentRequests = JSON.parse(JSON.stringify(response));
            this.rentRequests = this.rentRequests.filter(
              (u) => u.user.username === localStorage.getItem('username')
            );
            this.req = this.rentRequests[this.user.request_count];
            if (this.req) this.nr = this.req.requests.length;
          });
        });

      this.role = localStorage.getItem('role');
    }
  }

  logout() {
    this.mainService.logout();
  }
}
