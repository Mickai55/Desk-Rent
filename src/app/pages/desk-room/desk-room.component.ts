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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.bsRangeValue = [new Date(), new Date()];
  }

  ngOnInit(): void {}
  
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
    if (ch.occupied) {
      this.desk.available_spaces++;
      [ch.arrival_date, ch.depart_date] = [null, null];
    } else {
      this.desk.available_spaces--;
      [ch.arrival_date, ch.depart_date] = this.bsRangeValue;
    }
    ch.occupied = !ch.occupied;


    localStorage.setItem('desks', JSON.stringify(this.desks));
  }


}
