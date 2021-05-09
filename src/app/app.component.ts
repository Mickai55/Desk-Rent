import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  users;

  req;
  nr;

  desks;
  
  ngOnInit() {

    if(localStorage.getItem("users") == null || localStorage.getItem("users") == "")
      localStorage.setItem('users', JSON.stringify([]));
    else {
      this.users = JSON.parse(localStorage.getItem("users"));
    }
    
    if (localStorage.getItem('RentRequests') == "" || localStorage.getItem('RentRequests') == null)
      localStorage.setItem('RentRequests', JSON.stringify([]));

    if (JSON.parse(localStorage.getItem('RentRequests')).length !== 0 && this.users[0].requests_count + 1 === JSON.parse(localStorage.getItem('RentRequests')).length) {
      this.req = JSON.parse(localStorage.getItem('RentRequests'))[this.users[0].requests_count];
      this.nr = this.req.requests.length; 
    }

    if(localStorage.getItem('desks') == null || localStorage.getItem('desks') == "") 
      localStorage.setItem('desks', JSON.stringify([]));
  }
}

