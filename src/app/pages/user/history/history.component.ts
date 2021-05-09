import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
  users = JSON.parse(localStorage.getItem("users")); 
  user = this.users[0];
  rentRequests = JSON.parse(localStorage.getItem('RentRequests')).filter(
    u => 
    u.user._id === this.user._id &&
    u.status !== 'Pending...'
  ) //.reverse();
  initialRequests = this.rentRequests;
  desks = JSON.parse(localStorage.getItem('desks')); // ???
  filterStatus = "";
  filterDate = "";

  constructor() { }
  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    this.rentRequests = this.initialRequests.filter(req =>  req.timestamp.substring(0, 10).includes(this.filterDate) && 
                                                    req.status.toLowerCase().includes(this.filterStatus))
                                                    // req => req._id.toString().includes(filterValue)
  }

}
