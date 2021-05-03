import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
  users: User = JSON.parse(localStorage.getItem("users"));
  user = this.users[0];
  rentRequests = JSON.parse(localStorage.getItem('RentRequests')).filter(
    u => u.user._id === this.user._id &&
    u.status === 'Waiting approval'
    );
  desks = JSON.parse(localStorage.getItem('desks')); // ???

  constructor() { }
  ngOnInit(): void {
  }

}
