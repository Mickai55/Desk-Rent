import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChairRequest } from 'src/app/interfaces/chair-request';
import { Desk } from 'src/app/interfaces/desk';
import { RentRequest } from 'src/app/interfaces/rent-request';
import { User } from 'src/app/interfaces/user';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-send-rent-request',
  templateUrl: './send-rent-request.component.html',
  styleUrls: ['./send-rent-request.component.css'],
})
export class SendRentRequestComponent implements OnInit {
  rentRequests: RentRequest[] = [];
  rrLength;
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

  req;
  reqIds;
  reqs;

  constructor(private router: Router, private mainService: MainService) {}

  ngOnInit() {
    this.mainService.getChairRequests().subscribe((response) => {
      this.chairRequests = JSON.parse(JSON.stringify(response));
      console.log('chReq', this.chairRequests);
    });

    this.mainService
      .getLoggedUser(localStorage.getItem('username'))
      .subscribe((response) => {
        this.user = JSON.parse(JSON.stringify(response));
        console.log('user', response);
      });

    this.mainService.getRentRequests().subscribe((response) => {
      this.rentRequests = JSON.parse(JSON.stringify(response));
      this.rrLength = this.rentRequests.length;
      this.rentRequests = this.rentRequests.filter(
        (r) => r.user._id === this.user._id
      );
      this.req = this.rentRequests[this.user.request_count];

      if (this.req) {
        this.reqIds = this.rentRequests[this.user.request_count].requests;
        this.reqs = this.chairRequests.filter(
          (r) => this.reqIds.find((i) => i === r._id) != undefined
        );
      }

      console.log('rentReq', this.rentRequests);
    });

    this.mainService.getDesks().subscribe((response) => {
      this.desks = JSON.parse(JSON.stringify(response));
      console.log('dsk', response);
    });
  }

  confirmRequest() {
    this.req.status = 'Waiting approval';

    for (let chReqId of this.req.requests) {
      this.chairRequests.map((s) => {
        if (s._id === chReqId) {
          s.status = 'Waiting approval';
          this.mainService
            .updateChairRequest(s)
            .subscribe((r) => console.log(r));
        }
      });
    }

    this.user.request_count++;

    this.mainService.updateUser(this.user).subscribe((r) => console.log(r));
    this.mainService
      .updateRentRequest(this.req)
      .subscribe((r) => console.log(r));

    setTimeout(() => {
      this.router.navigate(['/rent']).then(() => {
        window.location.reload();
      });
    }, 200);
  }

  discardRequest() {
    this.req.status = 'Discarded';
    // this.req._id = this.rrLength;

    for (let chReqId of this.reqIds) {
      let chReq = this.chairRequests.find((c) => c._id === chReqId);

      chReq.status = 'Discarded';

      let chair = this.desks[chReq.desk_id].chairs[chReq.chair_id];

      // delete days requested from chair occupied_days array
      for (let day of chReq.days) {
        day = new Date(new Date(day).setHours(0, 0, 0)).toISOString();
        const index = chair.occupied_days.indexOf(day);
        if (index != -1) chair.occupied_days.splice(index, 1);
      }
      // delete requests from chairs' request ids array
      chair.requests = chair.requests.filter((r) => r !== chReq._id);

      this.mainService
        .updateDesk(this.desks[chReq.desk_id])
        .subscribe((r) => console.log(r));

      this.mainService
        .updateChairRequest(chReq)
        .subscribe((r) => console.log(r));
    }

    this.user.request_count++;
    this.mainService.updateUser(this.user).subscribe((r) => console.log(r));

    this.mainService
      .updateRentRequest(this.req)
      .subscribe((r) => console.log(r));

    this.ngOnInit();
    this.router.navigate(['/rent']).then(() => {
      window.location.reload();
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
}
