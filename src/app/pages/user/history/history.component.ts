import { Component, OnInit } from '@angular/core';
import { ChairRequest } from 'src/app/interfaces/chair-request';
import { Desk } from 'src/app/interfaces/desk';
import { RentRequest } from 'src/app/interfaces/rent-request';
import { User } from 'src/app/interfaces/user';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  rentRequests: RentRequest[] = [];
  chairRequests: ChairRequest[] = [];
  desks: Desk[] = [];
  user: User = {
    _id: 0,
    username: '',
    email: '',
    phone: '',
    location: '',
    website_link: '',
    request_count: 0,
    photo: '',
    userType: 'normal',
  };
  initialRequests = [];

  filterStatus = '';
  filterDate = '';

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.mainService
      .getLoggedUser(localStorage.getItem('username'))
      .subscribe((response) => {
        this.user = JSON.parse(JSON.stringify(response));
        console.log('user', response);
      });

    this.mainService.getRentRequests().subscribe((response) => {
      this.rentRequests = JSON.parse(JSON.stringify(response));

      this.rentRequests = this.rentRequests.filter(
        (u) =>
          u.user._id === this.user._id &&
          u.status !== 'Pending...' &&
          u.status !== 'Discarded'
      );
      this.rentRequests = this.rentRequests.reverse();
      this.initialRequests = this.rentRequests;
      console.log('rntReq', this.rentRequests);
    });

    this.mainService.getChairRequests().subscribe((response) => {
      this.chairRequests = JSON.parse(JSON.stringify(response));
      console.log('chReq', this.chairRequests);
    });

    this.mainService.getDesks().subscribe((response) => {
      this.desks = JSON.parse(JSON.stringify(response));
      console.log('dsk', response);
    });
  }

  applyFilter(event: Event) {
    this.rentRequests = this.initialRequests.filter(
      (req) =>
        req.timestamp.substring(0, 10).includes(this.filterDate) &&
        req.status.toLowerCase().includes(this.filterStatus.toLowerCase())
    );
  }

  cr(chReq) {
    return this.chairRequests.find((r) => r._id === chReq);
  }

  reverseDate(date) {
    return date
      .split('')
      .reverse()
      .join('')
      .split('-')
      .map((e) => e.split('').reverse().join(''))
      .join('-');
  }
}
