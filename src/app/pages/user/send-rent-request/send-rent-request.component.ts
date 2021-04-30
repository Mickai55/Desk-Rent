import { Component, OnInit } from '@angular/core';
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

  users: User = JSON.parse(localStorage.getItem("users"));
  user = this.users[0];

  req =  JSON.parse(localStorage.getItem('RentRequests'))[this.user.nrReq];

  constructor() { }
  async ngOnInit(): Promise<void> {
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
    
    window.location.reload();
  }
}
