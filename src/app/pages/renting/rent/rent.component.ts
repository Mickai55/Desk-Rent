import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Desk } from 'src/app/interfaces/desk';
import { Chair } from 'src/app/interfaces/chair';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  constructor(private mainService: MainService) {}
  public desks = [];

  // public async getDesks(): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     this.mainService.getDesks().subscribe( 
  //         (response) => {
            
  //           this.desks = JSON.parse(JSON.stringify(response));
  //           resolve(true); 
  //         }, err => {
  //           console.error(err);
  //           reject(false);
  //         });
  //   })
  // }

   ngOnInit()  { 
    this.mainService.getDesks().subscribe(response => {
      this.desks = JSON.parse(JSON.stringify(response));
      this.initializeTable();
    });
    
  }

  createChairs(nr, desk_id) {
    let chairs: Chair[] = [];
    for (let i = 0; i < nr; i++) {
      chairs.push({ _id: i, occupied: false, occupied_days: [], requests: [], posX: 0, posY: 0, desk_id: desk_id})
    }
    
    return chairs
  }

  //TO DO on server
  // deleteLastDesk() {
  // }

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
