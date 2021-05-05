import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-history-all',
  templateUrl: './history-all.component.html',
  styleUrls: ['./history-all.component.css']
})
export class HistoryAllComponent implements OnInit {

  users = JSON.parse(localStorage.getItem("users")); 
  user = this.users[0];
  rentRequests = JSON.parse(localStorage.getItem('RentRequests')).filter(
    u => 
    u.user._id === this.user._id &&
    u.status !== 'Pending...'
  ).reverse();
  initialRequests = this.rentRequests;
  desks = JSON.parse(localStorage.getItem('desks')); // ???
  filterStatus = "";
  filterDate = "";
  filterUser = "";

  constructor() { }
  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    this.rentRequests = this.initialRequests.filter(req =>  req.timestamp.substring(0, 10).includes(this.filterDate) && 
                                                    req.status.toLowerCase().includes(this.filterStatus) &&
                                                    req.user.full_name.includes(this.filterUser))
  }

  // accept(req) { 
  //   req.status='Accepted'
  //   localStorage.setItem('RentRequests', this.rentRequests);
  // }


}
