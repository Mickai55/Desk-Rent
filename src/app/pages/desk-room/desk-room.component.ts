import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Desk } from 'src/app/interfaces/desk';
import { RentComponent } from '../rent/rent.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';

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
  failedToOccupy: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
  ) {
    this.bsRangeValue = [new Date(), new Date()];
  }

  ngOnInit(): void {
    let spaces = 0;
    this.desk.chairs.map((currentElement, index, arr) => {
      if (!currentElement.occupied) {
        spaces++; 
      } 
    })
    
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
    this.desk.available_spaces = spaces;
    localStorage.setItem('desks', JSON.stringify(this.desks));
    
    // $("#forr").load(" #forr > *");
  }

  ngAfterViewInit() {
    this.positionChairs();
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
    const ddd = (d || new Date());
    for (const date of this.daysSelected) {
      if (date.toString() === ddd.toString())
        return false; 
    }
    return true;
  }

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
    // const index = this.daysSelected.findIndex(x => x == date);
    // if (index < 0) this.daysSelected.push(date);
    // else this.daysSelected.splice(index, 1);
    if (this.daysSelected.has(date)) {
      this.daysSelected.delete(date);
    } else { 
      this.daysSelected.add(date);
    }

    calendar.updateTodaysDate();
  }

  selectRange() {
    console.log("sdsdsds");
    
    let arrival_date, depart_date;
    [arrival_date, depart_date] = this.bsRangeValue;
    // let x = new Date(Date.parse(depart_date.toISOString()) + 2 * 86400000);
    for (let i = Date.parse(arrival_date.toISOString()); i<= Date.parse(depart_date.toISOString()); i += 86400000) {
      this.daysSelected.add(new Date(i).toISOString().substring(0, 10)) // danger!!
    }
  }

  occupyDesk() {
    let ch = this.desk.chairs[this.clickedDesk];
    // let days = []; 
    
    ch.requests.push({user: "user1", days: this.daysSelected})
    console.log(ch.requests) 


    // if (this.chairIsAvailable(ch, arrival_date, depart_date)) {
    //   ch.requests.push({user: "user1", arrival_date: arrival_date.toISOString(), depart_date: depart_date.toISOString()})
    //   this.failedToOccupy = false;
    // }
    // else {
    //   console.log("Occupied!!!!!!")
    //   this.failedToOccupy = true;
    // } 
    
    // Date.parse(currentElement.arrival_date.toISOString()) 
    // Parses a string containing a date, and returns the number of milliseconds between that date and midnight, January 1, 1970.

    // date:'shortTime'

    // e ocupart azi?????????
    let isOccupied = false;
    ch.occupied = isOccupied;


    localStorage.setItem('desks', JSON.stringify(this.desks));
  }

  // chairIsAvailable(ch, arrive, depart) {
  //   for (let i = 0; i < ch.requests.length; i++){
  //     let currentElement = ch.requests[i];
  //     if (Date.parse(arrive) - Date.parse(currentElement.arrival_date) >= 0 && Date.parse(arrive) - Date.parse(currentElement.depart_date) < 0)
  //       return false;

  //     if (Date.parse(depart) - Date.parse(currentElement.arrival_date) >= 0 && Date.parse(depart) - Date.parse(currentElement.depart_date) < 0)
  //       return false;

  //     if (Date.parse(arrive) - Date.parse(currentElement.arrival_date) < 0 && Date.parse(depart) - Date.parse(currentElement.depart_date) > 0)
  //       return false;
  //   }

  //   return true;
  // }



  // !!!!!! daypickeru ala vechi
  // @ViewChild('picker', { static: true }) _picker: MatDatepicker<Date>;

  // public CLOSE_ON_SELECTED = false;
  // public init = new Date();
  // public resetModel = new Date(0);
  // public model = [
  //   new Date('7/15/1966'),
  //   new Date('3/23/1968'),
  //   new Date('7/4/1992'),
  //   new Date('1/25/1994'),
  //   new Date('6/17/1998'),
  //   new Date('4/9/2021'),
  //   new Date('4/15/2021'),
  //   new Date('4/16/2021'),
  //   new Date('4/17/2021')
  // ];

  // public dateClass = (date: Date) => {
  //   if (this._findDate(date) !== -1) {
  //     return [ 'selected' ];
  //   }
  //   return [ ];
  // }

  // public dateChanged(event: MatDatepickerInputEvent<Date>): void {
  //   if (event.value) {
  //     const date = event.value;
  //     const index = this._findDate(date);
  //     if (index === -1) {
  //       this.model.push(date);
  //     } else {
  //       this.model.splice(index, 1)
  //     }
  //     this.resetModel = new Date(0);
  //     if (!this.CLOSE_ON_SELECTED) {
  //       const closeFn = this._picker.close;
  //       this._picker.close = () => { };
  //       this._picker['_popupComponentRef'].instance._calendar.monthView._createWeekCells()
  //       setTimeout(() => {
  //         this._picker.close = closeFn;
  //       });
  //     }
  //   }
  // }

  // public remove(date: Date): void {
  //   const index = this._findDate(date);
  //   this.model.splice(index, 1)
  // }

  // private _findDate(date: Date): number {
  //   return this.model.map((m) => +m).indexOf(+date);
  // }









}










