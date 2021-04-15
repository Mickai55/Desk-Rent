import { Component, OnInit } from '@angular/core';
import { Desk } from 'src/app/interfaces/desk';
import { Chair } from 'src/app/interfaces/chair';


@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  constructor() {}
  public desks: Desk[] = JSON.parse(localStorage.getItem('desks'));

  ngOnInit(): void {
    
    // this.desks= [
    //       { _id: 0, name: 'Office0', address: 'Slatina', total_spaces: 6, available_spaces: 6, chairs: this.createChairs(6) },
    //       { _id: 1, name: 'Office1', address: 'Bucharest', total_spaces: 10, available_spaces: 10, chairs: this.createChairs(10) },
    //       { _id: 2, name: 'Office2', address: 'Bucharest', total_spaces: 12, available_spaces: 12, chairs: this.createChairs(12) },
    //       { _id: 3, name: 'Office3', address: 'Bucharest', total_spaces: 15, available_spaces: 15, chairs: this.createChairs(15) },
    //       { _id: 4, name: 'Office4', address: 'Slatina', total_spaces: 6, available_spaces: 6, chairs: this.createChairs(6) },
    //       { _id: 5, name: 'Office5', address: 'Cluj', total_spaces: 10, available_spaces: 10, chairs: this.createChairs(10) },
    //       { _id: 6, name: 'Office6', address: 'Paris', total_spaces: 42, available_spaces: 42, chairs: this.createChairs(42) },
    //       { _id: 7, name: 'Office7', address: 'London', total_spaces: 15, available_spaces: 15, chairs: this.createChairs(15) },
    //     ];
    // localStorage.setItem('desks', JSON.stringify(this.desks));
  }

  createChairs(nr) {
    let chairs: Chair[] = [];
    for (let i = 0; i < nr; i++) {
      chairs.push({ _id: i, occupied: false, occupiedDays: [], requests: [], posX: 0, posY: 0})
    }
    
    return chairs
  }

  //TO DO
  deleteLastDesk() {
    this.desks.splice(this.desks.length - 1, 1);
    localStorage.setItem('desks', JSON.stringify(this.desks));
  }
}
