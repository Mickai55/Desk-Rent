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
    //       { _id: 0, name: 'aaa', address: 'Slatina', total_spaces: 6, available_spaces: 6, chairs: this.createChairs(6) },
    //       { _id: 1, name: 'bbb', address: 'Bucharest', total_spaces: 10, available_spaces: 10, chairs: this.createChairs(10) },
    //       { _id: 2, name: 'ccc', address: 'Bucharest', total_spaces: 12, available_spaces: 12, chairs: this.createChairs(12) },
    //       { _id: 3, name: 'dddd', address: 'Bucharest', total_spaces: 15, available_spaces: 15, chairs: this.createChairs(15) },
    //       { _id: 4, name: 'eee', address: 'Slatina', total_spaces: 6, available_spaces: 6, chairs: this.createChairs(6) },
    //       { _id: 5, name: 'f', address: 'Cluj', total_spaces: 10, available_spaces: 10, chairs: this.createChairs(10) },
    //       { _id: 6, name: 'g', address: 'Paris', total_spaces: 42, available_spaces: 42, chairs: this.createChairs(42) },
    //       { _id: 7, name: 'h', address: 'London', total_spaces: 15, available_spaces: 15, chairs: this.createChairs(15) },
    //     ];
    // localStorage.setItem('desks', JSON.stringify(this.desks));
  }

  createChairs(nr) {
    let chairs: Chair[] = [];
    for (let i = 0; i < nr; i++) {
      chairs.push({ _id: i, occupied: false, occupied_by: null, arrival_date: null, depart_date: null})
    }
    
    return chairs
  }

  //TO DO
  deleteLastDesk() {
    this.desks.splice(this.desks.length - 1, 1);
    localStorage.setItem('desks', JSON.stringify(this.desks));
  }
}
