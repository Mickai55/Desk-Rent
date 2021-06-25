import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Desk } from 'src/app/interfaces/desk';
import { RentComponent } from '../rent/rent.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MarkerService } from 'src/app/services/marker.service';
import { HttpClient } from '@angular/common/http';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-create-desk-room',
  templateUrl: './create-desk-room.component.html',
  styleUrls: ['./create-desk-room.component.css'],
})
export class CreateDeskRoomComponent implements OnInit {
  constructor(
    private router: Router,
    private rent: RentComponent,
    private modalService: NgbModal,
    private mainService: MainService,
    private notifierService: NotifierService
  ) {}
  notifier: NotifierService;
  closeResult = '';
  fakeArray = null;
  clickedChairIndex: number;
  modalOption: NgbModalOptions = {};
  public desk: Desk = {
    _id: 0,
    name: '',
    address: '',
    total_spaces: undefined,
    available_spaces: 0,
    chairs: [],
    dimension: 'Medium',
    lat: 44.425,
    lon: 26.1,
    images: [],
    has_location: false,
  };
  loc = false;
  pics = false;
  deskCount = 0;

  coords = [];

  ngOnInit(): void {
    this.mainService
      .getDeskCount()
      .subscribe(
        (response) => {
          this.deskCount = +JSON.parse(JSON.stringify(response))
          this.desk._id = this.deskCount;
        }
      );
  }

  addDesk() {
    if (this.desk.chairs.length === 0) {
      this.desk.available_spaces = this.desk.total_spaces;
      this.desk.chairs.push(
        ...this.rent.createChairs(this.desk.total_spaces, this.desk._id)
      );
    }

    this.desk.has_location = this.loc;
    if (
      MarkerService.latitude != undefined &&
      MarkerService.longitude != undefined
    ) {
      this.desk.lat = +MarkerService.latitude;
      this.desk.lon = +MarkerService.longitude;
    }

    this.mainService.createDesk(this.desk).subscribe((response) => {
      this.router.navigate(['/rent']);
      this.notifierService.notify('info', 'The Desk Room was created!');
    });
  }

  addChairs() {
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

    this.desk.chairs = [];
    this.desk.available_spaces = this.desk.total_spaces;
    this.desk.chairs.push(
      ...this.rent.createChairs(this.desk.total_spaces, this.desk._id)
    );
  }

  resetChairs() {
    this.desk.chairs = [];
    this.desk.chairs.push(
      ...this.rent.createChairs(this.desk.total_spaces, this.desk._id)
    );
  }

  onDragEnded(event, i) {
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
    let x = boundingClientRect.x - parentPosition.left;
    let y = boundingClientRect.y - parentPosition.top;

    this.clickedChairIndex = i;
    this.desk.chairs[this.clickedChairIndex].posX = x;
    this.desk.chairs[this.clickedChairIndex].posY = y;
  }

  getPosition(el) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  openModal(content) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'xl';
    this.modalOption.centered = true;
    this.modalService.open(content, this.modalOption);
  }

  images = [];
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var fileCount = event.target.files.length;
      for (let i = 0; i < fileCount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.images.push(event.target.result);
          this.desk.images.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}
