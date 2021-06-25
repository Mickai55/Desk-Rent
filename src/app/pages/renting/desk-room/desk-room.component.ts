import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Desk } from 'src/app/interfaces/desk';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MapComponent } from 'src/app/mapGetLocation/map.component';
import { RentRequest } from 'src/app/interfaces/rent-request';
import { ChairRequest } from 'src/app/interfaces/chair-request';
import { User } from 'src/app/interfaces/user';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-desk-room',
  templateUrl: './desk-room.component.html',
  styleUrls: ['./desk-room.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DeskRoomComponent implements OnInit {
  _id = this.route.snapshot.paramMap.get('_id');
  // desks = JSON.parse(localStorage.getItem('desks'));
  // desk: Desk = this.desks[this._id];
  desks = [];
  desk = {
    _id: 0,
    name: '',
    address: '',
    total_spaces: 0,
    available_spaces: 0,
    chairs: [],
    dimension: 'Medium',
    lat: 44.425,
    lon: 26.1,
    images: [],
    has_location: false,
  };
  clicked: boolean;
  modalRef: BsModalRef;
  clickedDesk: number;
  bsRangeValue: Date[];
  rentRequests: RentRequest[] = [];
  chairRequests: ChairRequest[] = [];
  user;
  isUserLogged = this.mainService.isUserLoggedIn();

  myInterval = 5000;
  activeSlideIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private mapService: MapComponent,
    private mainService: MainService
  ) {
    this.bsRangeValue;
  }

  async ngOnInit(): Promise<void> {
    this.mainService.getChairRequests().subscribe((response) => {
      this.chairRequests = JSON.parse(JSON.stringify(response));
      console.log('chReq', response);
    });

    if (this.isUserLogged)
      this.mainService
        .getLoggedUser(localStorage.getItem('username'))
        .subscribe((response) => {
          this.user = response;
          console.log('user', response);
        });

    this.mainService.getRentRequests().subscribe((response) => {
      this.rentRequests = JSON.parse(JSON.stringify(response));
      console.log('rentReq', response);
    });

    this.mainService.getDesks().subscribe((response) => {
      this.desks = JSON.parse(JSON.stringify(response));
      this.desk = this.desks[this._id];
      

      this.deskDimensions();
      this.filter = this.filterForDateRange();

      setTimeout(() => {
        if (this.desk.lat && this.desk.lon && this.desk.has_location)
          this.mapService.posMarker(this.desk.lat, this.desk.lon);
          
        this.verifySpacesLeft();

        this.positionChairs();
      }, 100);
    });
  }

  deskDimensions() {
    let container = document.getElementById('container');
    if (this.desk.dimension == 'Small') {
      container.style.width = '1010px';
      container.style.height = '500px';
    } else if (this.desk.dimension == 'Medium') {
      container.style.width = '1010px';
      container.style.height = '800px';
    } else if (this.desk.dimension == 'Large') {
      container.style.width = '1010px';
      container.style.height = '1200px';
    }
  }

  verifySpacesLeft() {
    let spaces = 0;
    this.desk.chairs.map((currentElement, index, arr) => {
      if (currentElement.occupied_days)
        currentElement.occupied =
          currentElement.requests.find((i) => {
            let r = this.chairRequests.find((c) => c._id === i);
            return (
              r.days.find(
                (d) => d === new Date().toISOString().substring(0, 10)
              ) !== undefined && r.status === 'Accepted'
            );
          }) !== undefined;

      if (!currentElement.occupied) {
        spaces++;
      }
    });
    this.desk.available_spaces = spaces;

    this.mainService.updateDesk(this.desk).subscribe((response) => {
      console.log(response);
    });
  }

  ngAfterViewInit() {}

  positionChairs() {
    for (let i = 0; i < this.desk.chairs.length; i++) {
      var el = document.getElementById('object-' + i);
      el.style.transform =
        'translate3d(' +
        this.desk.chairs[i].posX +
        'px, ' +
        this.desk.chairs[i].posY +
        'px, 0px)';
    }
  }

  clickedDeskRequests = [];

  openModal(template: TemplateRef<any>, i: number) {
    this.modalRef = this.modalService.show(template);

    this.clickedDesk = i;
    let ch = this.desk.chairs[i];
    this.clickedDeskRequests = this.chairRequests.filter(
      (r) =>
        ch.requests.find((c) => c === r._id) != undefined &&
        r.status !== 'Discarded' && 
        this.showDate(r.days[r.days.length - 1])
    );
    // this.clickedDeskRequests = this.clickedDeskRequests.filter(r => r.status !== 'Discarded');
  }

  chairStatus(i: number) {
    let ch = this.desk.chairs[i];
    let nrReq = this.chairRequests.filter(
      (r) =>
        ch.requests.find((c) => c === r._id) != undefined &&
        r.status !== 'Discarded' && 
        this.showDate(r.days[r.days.length - 1])
    );

    return nrReq.length;
  }

  //on SV
  // deleteDesk() {
  // }

  public today = new Date();
  max_date = new Date(Date.now() + 86400000 * 60);
  daysSelected: Set<any> = new Set([]);
  event: any;

  myFilter = (d: Date | null): boolean => {
    if (this.desk.chairs[this.clickedDesk].occupied_days.length === 0)
      return true;

    const ddd = new Date(d);

    for (const date of this.desk.chairs[this.clickedDesk].occupied_days) {
      if (date.toString() === ddd.toISOString()) return false;
    }
    return true;
  };
  filterForDateRange = () => {
    let occDysMat = [];
    for (let ch of this.desk.chairs) {
      let occDys = [];
      for (let d of ch.occupied_days) occDys.push(new Date(d));
      occDysMat.push({ occupied_days: occDys });
    }
    return occDysMat;
  };
  filter;

  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
    return this.daysSelected.has(date) ? 'selected' : null;
  };

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
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
      for (
        let i = Date.parse(arrival_date.toISOString());
        i <= Date.parse(depart_date.toISOString());
        i += 86400000
      ) {
        this.daysSelected.add(new Date(i).toISOString().substring(0, 10));
      }
    }
  }

  occupyDesk() {
    // put the request on ChairRequests
    if (this.bsRangeValue != null) 
      this.selectRange();
    let days = Array.from(this.daysSelected);
    if (days.length === 0)
      return;
    days.sort();
    let ch = this.desk.chairs[this.clickedDesk];
    let chReq: ChairRequest = {
      _id: this.chairRequests.length + 1,
      desk_id: ch.desk_id,
      chair_id: ch._id,
      days: days,
      status: 'Pending...',
      username: this.user.username,
    };
    this.chairRequests.push(chReq);

    this.mainService.addChairRequest(chReq).subscribe((response) => {
      console.log(response);
    });

    // put the request on Chair's requests
    ch.requests.push(chReq._id);

    // put the request on RentRequests
    let reqByNr = this.rentRequests.filter(
      (u) =>
        u.user._id === this.user._id &&
        u.user.request_count === this.user.request_count
    )[0];
    if (reqByNr) {
      reqByNr.requests.push(chReq._id);
      this.mainService.updateRentRequest(reqByNr).subscribe((response) => {
        console.log(response);
      });
    } else {
      let r = {
        _id: this.rentRequests.length + 1,
        user: this.user,
        requests: [chReq._id],
        status: 'Pending...',
        timestamp: new Date(Date.now()),
      };
      this.rentRequests.push(r);

      this.mainService.addRentRequest(r).subscribe((response) => {
        console.log(response);
      });
    }

    // put the requested days on Chair's occupied_days
    let dates: Date[] = [];
    for (let day of days) {
      let newDate = new Date(day);
      newDate.setHours(0, 0, 0);
      dates.push(newDate);
    }
    if (ch.occupied_days == null) ch.occupied_days = dates;
    else ch.occupied_days.push(...dates);

    // reset daysSelect and bsRangeValue for the next request
    this.daysSelected.clear();
    this.bsRangeValue = [null, null];

    this.verifySpacesLeft();

    this.mainService.updateDesk(this.desk).subscribe((response) => {
      console.log(response);
      window.location.reload();
    });

    // this.ngOnInit();
  }

  showDate(day) { 
    return (new Date().getTime() - new Date(day).getTime()) < 86399999; 
  }

  reverseDate(date) {
    return date
      .split('')
      .reverse()
      .join('')
      .split('-')
      .map((e) => e.split('').reverse().join(''))
      .join('-');
  }
}
