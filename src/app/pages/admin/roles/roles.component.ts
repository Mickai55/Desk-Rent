import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  users = [];

  constructor(private mainService: MainService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.mainService.getAllUsers().subscribe(response => {
      console.log(response);
      
      this.users = JSON.parse(JSON.stringify(response));
      this.initializeTable();
    })
  }

  changeRole(id, role) {
    let u = this.users.find(u => u._id === id)
    u.userType = role;
    this.mainService.updateUser(u).subscribe();

    this.notifierService.notify('success', u.username + ' is now ' + role.toLowerCase() + '!');
  }

  displayedColumns: string[] = ['_id', 'username', 'role'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  initializeTable() {
    this.dataSource = new MatTableDataSource(this.users);
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