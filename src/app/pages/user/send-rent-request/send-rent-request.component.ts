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
  desks = JSON.parse(localStorage.getItem('desks'));

  users = JSON.parse(localStorage.getItem("users"));
  user = this.users[0];

  req;

  constructor(
    private router: Router 
    ){}
  async ngOnInit(): Promise<void> {
    this.rentRequests = await JSON.parse(localStorage.getItem('RentRequests'));
    if (localStorage.getItem('RentRequests') && this.user)
      this.req = this.rentRequests[this.user.requests_count];
  }

  confirmRequest() {
    this.req.status = 'Waiting approval';

    for (let x of this.req.requests) {
      let d = this.desks[x.desk_id].chairs[x.chair_id];

      d.requests.map(s => s.status = 'Waiting approval');
    }

    this.user.requests_count++;
    localStorage.setItem('desks', JSON.stringify(this.desks)); 
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('RentRequests', JSON.stringify(this.rentRequests));
    
    this.router.navigate(['/rent'])
    .then(() => {
      window.location.reload();
    });
  }

  discardRequest() {
    let req = this.rentRequests[this.user.requests_count];

    for (let chReq of req.requests) {
      let chair = this.desks[chReq.desk_id].chairs[chReq.chair_id];

      // delete days requested from chair occupied_days array
      for (let day of chReq.days) {
        day = new Date(new Date(day).setHours(0, 0, 0)).toISOString();
        const index = chair.occupied_days.indexOf(day);
        if (index != -1)
          chair.occupied_days.splice(index, 1);
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
