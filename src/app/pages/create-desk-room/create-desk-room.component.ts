import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Desk } from 'src/app/interfaces/desk';
import { RentComponent } from '../../pages/rent/rent.component';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { MarkerService } from 'src/app/services/marker.service';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
    ) {}
  public desks: Desk[] = JSON.parse(localStorage.getItem('desks')); 
  notifier: NotifierService;
  closeResult = '';
  fakeArray = null;
  clickedChairIndex: number;
  modalOption: NgbModalOptions = {};  
  public desk: Desk = { _id: 0, name: '', address: '', total_spaces: 0, available_spaces: 0, chairs: [], dimension: 'Medium', lat: 44.425, long: 26.1, images: [] };
  isDisabled = false;

  coords = [];

  ngOnInit(): void {}
  
  addDesk() {
    if (this.isDisabled == false)
      this.addChairs();
    this.desk.lat = MarkerService.latitude;
    this.desk.long = MarkerService.longitude;

    this.desks.push(this.desk);
    localStorage.setItem('desks', JSON.stringify(this.desks));

    this.router.navigate(['/rent']);
  }

  addChairs() {
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
    

    this.desk._id = this.desks.length; // the desk will be added as the last item on the list
    this.desk.available_spaces = this.desk.total_spaces;
    if (this.desk.chairs.length === 0)
      this.desk.chairs.push(...this.rent.createChairs(this.desk.total_spaces));

    $("#forr").load(" #forr > *");
    this.isDisabled = true;
  }

  resetChairs() {
    this.desk.chairs = [];
    this.desk.chairs.push(...this.rent.createChairs(this.desk.total_spaces));
  }

  onDragEnded(event, i) {
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
    let x = boundingClientRect.x - parentPosition.left;
    let y = boundingClientRect.y - parentPosition.top;
    console.log('Chair: ', i, ' | x: ' + x, 'y: ' + y);
    
    this.clickedChairIndex = i;
    this.desk.chairs[this.clickedChairIndex].posX = x;
    this.desk.chairs[this.clickedChairIndex].posY = y;
  }

  getPosition(el) {
    let x = 0;
    let y = 0;
    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
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
    this.modalService.open(content, this.modalOption );
  }

  images = [];
    
  onFileChange(event) {
    if(event.target.files && event.target.files[0]) {
      var fileCount = event.target.files.length;
      for (let i = 0; i < fileCount; i++) {
        var reader = new FileReader();
          
        reader.onload = (event:any) => {
            this.images.push(event.target.result);
          this.desk.images.push(event.target.result);  
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  } 
}
