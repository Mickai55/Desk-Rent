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
    
    if (localStorage.getItem('RentRequests'))
      this.rentRequests = await JSON.parse(localStorage.getItem('RentRequests'));
    else
      localStorage.setItem('RentRequests', JSON.stringify(this.rentRequests));
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

      if (currentElement.occupiedDays)
      currentElement.occupied = (currentElement.occupiedDays.find(item => {let k = new Date(item); k.setHours(3, 0, 0); return k.getFullYear() == this.today.getFullYear()}) != undefined &&
                                currentElement.occupiedDays.find(item => {let k = new Date(item); k.setHours(3, 0, 0);return k.getMonth() == this.today.getMonth()}) != undefined &&
                                currentElement.occupiedDays.find(item => {let k = new Date(item); k.setHours(3, 0, 0);return k.getDay() == this.today.getDay()}) != undefined) 

      if (!currentElement.occupied) {
        spaces++; 
      } 
    })
    this.desk.available_spaces = spaces;
    localStorage.setItem('desks', JSON.stringify(this.desks));
  }

  ngAfterViewInit() {
    this.positionChairs();
    if (this.desk.lat && this.desk.long)
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
  daysSelected: Set<any> = new Set([]);
  event: any;  

  myFilter = (d: Date | null): boolean => { 
    if (this.desk.chairs[this.clickedDesk].occupiedDays.length === 0)
      return true;

    // const ddd = (d || new Date());
    const ddd = new Date(d);

    for (const date of this.desk.chairs[this.clickedDesk].occupiedDays) {
      if (date.toString() === ddd.toISOString()) 
        return false; 
    }
    return true;
  }
  filterForDateRange = (() => {
    let occDysMat = []
    for (let ch of this.desk.chairs) {
      let occDys = [];
      for (let d of ch.occupiedDays)
        occDys.push(new Date(d))
      occDysMat.push({"occupiedDays": occDys})
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

  occupyDesk() { // TODO impartit pe mai multe functii!!  
    if (this.bsRangeValue != null)
      this.selectRange();
    let days = Array.from(this.daysSelected); 
    days.sort()
    let ch = this.desk.chairs[this.clickedDesk];
    let chReq: ChairRequest = { _id: ch.requests.length, desk_id: ch.desk_id, chair_id: ch._id, days: days };
    ch.requests.push(chReq);
    
    let reqByNr = this.rentRequests.filter(u => u.user.name === this.user.name && u.user.nrReq === this.user.nrReq)
    if (reqByNr.length != 0)
      reqByNr[0].requests.push(chReq)
    else
      this.rentRequests.push({user: this.user, number: this.user.nrReq, requests: [chReq], status: 'Pending...', timestamp: new Date(Date.now())});

    let dates: Date[] = [];
    for (let day of days) {
      let newDate = new Date(day);
      newDate.setHours(0, 0, 0);
      dates.push(newDate)
    }
    if (ch.occupiedDays == null)
      ch.occupiedDays = dates;
    else
      ch.occupiedDays.push(...dates);

    this.daysSelected.clear();
    this.bsRangeValue = [null, null];

    localStorage.setItem('RentRequests', JSON.stringify(this.rentRequests));
    localStorage.setItem('desks', JSON.stringify(this.desks));
    this.verifySpacesLeft();

    window.location.reload();
  }

}









