import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  users = JSON.parse(localStorage.getItem("users"));
  user = this.users[0];

  req = JSON.parse(localStorage.getItem('RentRequests'))[this.user.nrReq];
  nr;
  
  ngOnInit() {
    if (this.req) {
      this.nr = this.req.requests.length; 
    }
    
  }
 
}

