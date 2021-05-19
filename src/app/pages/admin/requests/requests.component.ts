import { Component, OnInit } from '@angular/core';
import { ChairRequest } from 'src/app/interfaces/chair-request';
import { Desk } from 'src/app/interfaces/desk';
import { RentRequest } from 'src/app/interfaces/rent-request';
import { User } from 'src/app/interfaces/user';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
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
  filterUser = '';

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.mainService
      .getLoggedUser(localStorage.getItem('username'))
      .subscribe((response) => {
        this.user = JSON.parse(JSON.stringify(response));
        console.log('user', response);
      });

    this.mainService.getRentRequests().subscribe((response) => {
      this.rentRequests = JSON.parse(JSON.stringify(response));

      this.rentRequests = this.rentRequests.filter(
        (u) => u.status !== 'Pending...' && u.status !== 'Discarded'
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

  reverseDate(date) {
    return date
      .split('')
      .reverse()
      .join('')
      .split('-')
      .map((e) => e.split('').reverse().join(''))
      .join('-');
  }

  applyFilter() {
    this.rentRequests = this.initialRequests.filter(
      (req) =>
        req.timestamp.substring(0, 10).includes(this.filterDate) &&
        req.status.toLowerCase().includes(this.filterStatus.toLowerCase()) &&
        req.user.username.includes(this.filterUser)
    );
  }

  accept(id) {
    this.rentRequests[id].status = 'Accepted';

    this.mainService
      .updateRentRequest(this.rentRequests[id])
      .subscribe((r) => console.log(r));

    for (let chReqId of this.rentRequests[id].requests) {
      let chReq = this.chairRequests.find((c) => c._id === chReqId);
      chReq.status = 'Accepted';

      this.mainService
        .updateChairRequest(chReq)
        .subscribe((r) => console.log(r));
    }
  }

  reject(id) {
    this.rentRequests[id].status = 'Rejected';

    for (let chReqId of this.rentRequests[id].requests) {
      let chReq = this.chairRequests.find((c) => c._id === chReqId);
      let chair = this.desks[chReq.desk_id].chairs[chReq.chair_id];

      // delete days requested from chair occupied_days array
      for (let day of chReq.days) {
        day = new Date(new Date(day).setHours(0, 0, 0)).toISOString();
        const index = chair.occupied_days.indexOf(day);
        if (index != -1) chair.occupied_days.splice(index, 1);
      }
      // delete requests from chair requests array
      chair.requests = chair.requests.filter((r) => r !== chReq._id);

      // making requests 'rejected' in ChairRequests
      chReq.status = 'Rejected';
      this.mainService.updateChairRequest(chReq).subscribe();

      this.mainService
        .updateDesk(this.desks[chReq.desk_id])
        .subscribe((r) => console.log(r));
    }

    this.mainService
      .updateRentRequest(this.rentRequests[id])
      .subscribe((r) => console.log(r));
  }

  cr(chReq) {
    return this.chairRequests.find((r) => r._id === chReq);
  }
}
