import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Desk } from 'src/app/interfaces/desk';
import { RentComponent } from '../rent/rent.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-desk-room',
  templateUrl: './desk-room.component.html',
  styleUrls: ['./desk-room.component.css'],
})

export class DeskRoomComponent implements OnInit {
  _id = this.route.snapshot.paramMap.get('_id');
  desks = JSON.parse(localStorage.getItem('desks'));
  desk: Desk = this.desks[this._id];
  clicked: boolean;
  modalRef: BsModalRef;
  clickedDesk: number;
  bsRangeValue: Date[];
  failedToOccupy: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.bsRangeValue = [new Date(), new Date()];
  }

  ngOnInit(): void {
    let spaces = 0;
    this.desk.chairs.map((currentElement, index, arr) => {
      if (!currentElement.occupied) {
        spaces++;
      }
      // var el = document.getElementById("object-" + index);
      // el.style.backgroundColor = 'red';

      // currentElement.nativeElement.style.background = 'red';


    })
    this.desk.available_spaces = spaces;
    localStorage.setItem('desks', JSON.stringify(this.desks));
    
    // $("#forr").load(" #forr > *");
  }

  positionChairs() {
    // debugger
    for (let i = 0; i < this.desk.chairs.length; i++) {

      var el = document.getElementById("object-" + i);
      el.style.backgroundColor = 'purple';
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

  occupyDesk() {
    let ch = this.desk.chairs[this.clickedDesk];
    let arrival_date, depart_date;
    [arrival_date, depart_date] = this.bsRangeValue;
    // debugger
    if (this.chairIsAvailable(ch, arrival_date, depart_date)) {
      ch.requests.push({user: "user1", arrival_date: arrival_date.toISOString(), depart_date: depart_date.toISOString()})
      this.failedToOccupy = false;
    }
    else {
      console.log("Occupied!!!!!!")
      this.failedToOccupy = true;
    } 
    
    // Date.parse(currentElement.arrival_date.toISOString()) 
    // Parses a string containing a date, and returns the number of milliseconds between that date and midnight, January 1, 1970.

    // date:'shortTime'

    // this should be in ngOnInit ???
    let isOccupied = false;
    
    ch.requests.map((currentElement, index, arr) => {
      if (Date.now() - Date.parse(currentElement.arrival_date) >= 0 && Date.now() - Date.parse(currentElement.depart_date) <= 0) {
        isOccupied = true;
      }
      // else if (Date.toString()- Date.parse(currentElement.arrival_date) === 0)
      //   isOccupied = true;
    })
    ch.occupied = isOccupied;


    localStorage.setItem('desks', JSON.stringify(this.desks));
  }

  chairIsAvailable(ch, arrive, depart) {
    for (let i = 0; i < ch.requests.length; i++){
      let currentElement = ch.requests[i];
      if (Date.parse(arrive) - Date.parse(currentElement.arrival_date) >= 0 && Date.parse(arrive) - Date.parse(currentElement.depart_date) < 0)
        return false;

      if (Date.parse(depart) - Date.parse(currentElement.arrival_date) >= 0 && Date.parse(depart) - Date.parse(currentElement.depart_date) < 0)
        return false;

      if (Date.parse(arrive) - Date.parse(currentElement.arrival_date) < 0 && Date.parse(depart) - Date.parse(currentElement.depart_date) > 0)
        return false;
    }

    return true;
  }

}
