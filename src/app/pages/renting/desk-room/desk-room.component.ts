import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Desk } from 'src/app/interfaces/desk';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MapComponent } from 'src/app/mapGetLocation/map.component';
import { RentRequest } from 'src/app/interfaces/rent-request';
import { ChairRequest } from 'src/app/interfaces/chair-request';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-desk-room',
  templateUrl: './desk-room.component.html',
  styleUrls: ['./desk-room.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class DeskRoomComponent implements OnInit { 
  
  _id = this.route.snapshot.paramMap.get('_id');
  desks = JSON.parse(localStorage.getItem('desks'));
  desk: Desk = this.desks[this._id];
  clicked: boolean;
  modalRef: BsModalRef;
  clickedDesk: number;
  bsRangeValue: Date[];
  rentRequests: RentRequest[] = [];  

  myInterval = 5000;
  activeSlideIndex = 0;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private mapService: MapComponent
  ) {
    this.bsRangeValue;
  }

  async ngOnInit(): Promise<void> {
    this.deskDimensions();
    this.verifySpacesLeft();
    
    this.rentRequests = await JSON.parse(localStorage.getItem('RentRequests'));
  }

  deskDimensions() {
    let container = document.getElementById("container");
    if (this.desk.dimension == 'Small') {
      container.style.width = '1010px';
      container.style.height = '500px';
    }
    else if (this.desk.dimension == 'Medium') {
      container.style.width = '1010px';
      container.style.height = '800px';
    }
    else if (this.desk.dimension == 'Large') {
      container.style.width = '1010px';
      container.style.height = '1200px';
    }
    localStorage.setItem('desks', JSON.stringify(this.desks));
  }

  verifySpacesLeft() {
    let spaces = 0;
    this.desk.chairs.map((currentElement, index, arr) => { 

      // if (currentElement.occupied_days) 
      // currentElement.occupied = (currentElement.occupied_days.find(item => {let k = new Date(item); k.setHours(3, 0, 0); return k.getFullYear() == this.today.getFullYear()}) != undefined &&
      //                           currentElement.occupied_days.find(item => {let k = new Date(item); k.setHours(3, 0, 0);return k.getMonth() == this.today.getMonth()}) != undefined &&
      //                           currentElement.occupied_days.find(item => {let k = new Date(item); k.setHours(3, 0, 0);return k.getDay() == this.today.getDay()}) != undefined)
                                //  &&
                                // currentElement.requests.find(item => item.status === 'Accepted') != undefined) 

      if (currentElement.occupied_days)
      currentElement.occupied = currentElement.requests.find(i =>  {return i.days.find(d => d === new Date().toISOString().substring(0, 10)) !== undefined && i.status === 'Accepted'}) !== undefined
        // currentElement.occupied = (currentElement.occupied_days.find(item => {let k = new Date(item); k.setHours(3, 0, 0); let u = k.toISOString().substring(0, 10); return (u === new Date().toISOString().substring(0, 10))}) !== undefined
        // && currentElement.requests.find(item => item.status === 'Accepted') != undefined
        // )
      if (!currentElement.occupied) {
        spaces++; 
      } 
    })
    this.desk.available_spaces = spaces;
    localStorage.setItem('desks', JSON.stringify(this.desks));
  }

  ngAfterViewInit() {
    this.positionChairs();
    if (this.desk.lat && this.desk.long && this.desk.has_location)
      this.mapService.posMarker(this.desk.lat, this.desk.long);
  }

  positionChairs() {
    for (let i = 0; i < this.desk.chairs.length; i++) {
      var el = document.getElementById("object-" + i);
      el.style.transform = 'translate3d(' + this.desk.chairs[i].posX + 'px, ' + this.desk.chairs[i].posY + 'px, 0px)';
    }
  }
  
  openModal(template: TemplateRef<any>, i: number) {
    this.modalRef = this.modalService.show(template);
    this.clickedDesk = i;
  }

  deleteDesk() {
    this.desks.splice(+this._id, 1);
    this.desks.map((currentElement, index, arr) => {
      currentElement._id = index;
    });

    localStorage.setItem('desks', JSON.stringify(this.desks));
    this.router.navigate(['/rent']);
  }

  public today = new Date();
  max_date = new Date(Date.now() + 86400000 * 60)
  daysSelected: Set<any> = new Set([]);
  event: any;  

  myFilter = (d: Date | null): boolean => { 
    if (this.desk.chairs[this.clickedDesk].occupied_days.length === 0)
      return true;

    // const ddd = (d || new Date());
    const ddd = new Date(d);

    for (const date of this.desk.chairs[this.clickedDesk].occupied_days) {
      if (date.toString() === ddd.toISOString()) 
        return false; 
    }
    return true;
  }
  filterForDateRange = (() => {
    let occDysMat = []
    for (let ch of this.desk.chairs) {
      let occDys = [];
      for (let d of ch.occupied_days)
        occDys.push(new Date(d))
      occDysMat.push({"occupied_days": occDys})
    }
    return occDysMat;
  })
  filter = this.filterForDateRange();

  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelected.has(date) ? "selected" : null;
  };

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    if (this.daysSelected.has(date)) {
      this.daysSelected.delete(date);
    } else { 
      this.daysSelected.add(date);
    }
    calendar.updateTodaysDate();
  }

  selectRange() {
    if (this.bsRangeValue[0] != null) {
      
      let arrival_date, depart_date;
      [arrival_date, depart_date] = this.bsRangeValue;
      for (let i = Date.parse(arrival_date.toISOString()); i<= Date.parse(depart_date.toISOString()); i += 86400000) {
        this.daysSelected.add(new Date(i).toISOString().substring(0, 10))
      }
    }
  }

  user: User = JSON.parse(localStorage.getItem("users"))[0];

  occupyDesk() {
    // put the request on ChairRequests
    if (this.bsRangeValue != null)
      this.selectRange();
    let days = Array.from(this.daysSelected); 
    days.sort()
    let ch = this.desk.chairs[this.clickedDesk];
    let chReq: ChairRequest = { _id: ch.requests.length, desk_id: ch.desk_id, chair_id: ch._id, days: days, status: 'Pending...' };
    ch.requests.push(chReq);
    
    // put the request on RentRequests
    let reqByNr = this.rentRequests.filter(u => u.user._id === this.user._id && u.user.requests_count === this.user.requests_count)
    if (reqByNr.length != 0)
      reqByNr[0].requests.push(chReq)
    else 
      this.rentRequests.push({user: this.user, _id: this.user.requests_count, requests: [chReq], status: 'Pending...', timestamp: new Date(Date.now())});

    // put the requested days on Chair's occupied_days
    let dates: Date[] = [];
    for (let day of days) {
      let newDate = new Date(day);
      newDate.setHours(0, 0, 0);
      dates.push(newDate)
    }
    if (ch.occupied_days == null)
      ch.occupied_days = dates;
    else
      ch.occupied_days.push(...dates);

    // reset daysSelect and bsRangeValue for the next request
    this.daysSelected.clear();
    this.bsRangeValue = [null, null];
    
    this.verifySpacesLeft();

    localStorage.setItem('RentRequests', JSON.stringify(this.rentRequests));
    localStorage.setItem('desks', JSON.stringify(this.desks));

    window.location.reload();
  }

}










