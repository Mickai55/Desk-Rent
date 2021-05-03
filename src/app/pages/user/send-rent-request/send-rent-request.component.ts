import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RentRequest } from 'src/app/interfaces/rent-request';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-send-rent-request',
  templateUrl: './send-rent-request.component.html',
  styleUrls: ['./send-rent-request.component.css']
})
export class SendRentRequestComponent implements OnInit {
  
  rentRequests: RentRequest[] = [];  
  desks = JSON.parse(localStorage.getItem('desks')); // ???

  users = JSON.parse(localStorage.getItem("users"));
  user = this.users[0];

  req = JSON.parse(localStorage.getItem('RentRequests'))[this.user.nrReq];

  constructor(
    private router: Router 
    ) { }
  async ngOnInit(): Promise<void> {

    //e nevoie de asta?
    if (localStorage.getItem('RentRequests')) {
      this.rentRequests = await JSON.parse(localStorage.getItem('RentRequests'));
      this.req = this.rentRequests[this.user.nrReq];
    }
    else {
      localStorage.setItem('RentRequests', JSON.stringify(this.rentRequests));
    }
  }

  confirmRequest() {
    this.req.status = 'Waiting approval';

    this.user.nrReq++;
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('RentRequests', JSON.stringify(this.rentRequests));
    
    this.router.navigate(['/rent'])
    .then(() => {
      window.location.reload();
    });
  }

  discardRequest() {
    let req = this.rentRequests[this.user.nrReq];

    for (let chReq of req.requests) {
      let desk = this.desks.filter(d => d._id === chReq.desk_id)[0];
      let chair = desk.chairs.filter(c => c._id === chReq.chair_id)[0];

      // delete days requested from chair occupiedDays array     
      for (let day of chReq.days) {
        day = new Date(new Date(day).setHours(0, 0, 0)).toISOString();
        const index = chair.occupiedDays.indexOf(day);
        if (index != -1)
          chair.occupiedDays.splice(index, 1);
      }
      // delete requests from chair requests array 
      chair.requests = chair.requests.filter(r => r._id !== chReq._id);
    }

    // delete requests from RentRequests requests array
    this.rentRequests.splice(this.rentRequests.length - 1, 1);

    localStorage.setItem('desks', JSON.stringify(this.desks));
    localStorage.setItem('RentRequests', JSON.stringify(this.rentRequests));  

    this.router.navigate(['/rent'])
    .then(() => {
      window.location.reload();
    });
  }
}
