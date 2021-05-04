import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Desk } from 'src/app/interfaces/desk';
import { Chair } from 'src/app/interfaces/chair';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  constructor() {}
  public desks: Desk[] = [];

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('desks'))
      this.desks = await JSON.parse(localStorage.getItem('desks'));
    else
      localStorage.setItem('desks', JSON.stringify(this.desks));
    this.initializeTable();
  }

  createChairs(nr, desk_id) {
    let chairs: Chair[] = [];
    for (let i = 0; i < nr; i++) {
      chairs.push({ _id: i, occupied: false, occupied_days: [], requests: [], posX: 0, posY: 0, desk_id: desk_id})
    }
    
    return chairs
  }

  //TO DO
  deleteLastDesk() {
    this.desks.splice(this.desks.length - 1, 1);
    localStorage.setItem('desks', JSON.stringify(this.desks));
    
    window.location.reload();
  }

  // table
  displayedColumns: string[] = ['_id', 'name', 'address', 'available_spaces'];
  dataSource: any;
   
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  initializeTable() {
    this.dataSource = new MatTableDataSource(this.desks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
