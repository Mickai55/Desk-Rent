import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit { 

  users = JSON.parse(localStorage.getItem("users")); 
  user = this.users[0];
  rentRequests = JSON.parse(localStorage.getItem('RentRequests')).filter(
    u => u.status !== 'Pending...'
  )//.reverse();
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

  accept(id) { 
    this.rentRequests[id].status='Accepted';

    for (let x of this.rentRequests[id].requests) {
      let reqs = this.desks[x.desk_id].chairs[x.chair_id].requests;

      for (let r of reqs)
        if (r._id === x._id)
          r.status = 'Accepted';
      // reqs.requests.map(r => r._id === x._id ? r.status = 'Accepted': r.status = r.status); 
    }

    localStorage.setItem('desks', JSON.stringify(this.desks));
    localStorage.setItem('RentRequests', JSON.stringify(this.rentRequests)); 

    // this.router.navigate(['/rent'])
    // .then(() => {
    //   window.location.reload();
    // });
  }

  reject(id) { 
    this.rentRequests[id].status='Rejected';

    for (let chReq of this.rentRequests[id].requests) {
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

    localStorage.setItem('desks', JSON.stringify(this.desks));
    localStorage.setItem('RentRequests', JSON.stringify(this.rentRequests));
  }
}
