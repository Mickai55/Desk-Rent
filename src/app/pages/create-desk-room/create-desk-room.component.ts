import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Desk } from 'src/app/interfaces/desk';
import { RentComponent } from '../../pages/rent/rent.component';

@Component({
  selector: 'app-create-desk-room',
  templateUrl: './create-desk-room.component.html',
  styleUrls: ['./create-desk-room.component.css'],
})
export class CreateDeskRoomComponent implements OnInit {
  notifier: NotifierService;
  constructor(
    private router: Router, 
    private rent: RentComponent
    ) {}
  public desks: Desk[] = JSON.parse(localStorage.getItem('desks'));
  fakeArray = null;
  clickedChairIndex: number;
  

  public desk: Desk = { _id: 0, name: '', address: '', total_spaces: 0, available_spaces: 0, chairs: [] };
  //     { _id: 0, name: 'aaa', address: 'Slatina', total_spaces: 10 },
  ngOnInit(): void {}
  
  add() {
    this.desks.push(this.desk);
    localStorage.setItem('desks', JSON.stringify(this.desks));

    this.router.navigate(['/rent']);
  }

  addChairs() {
    // let div = document.getElementById("chair");
    // var cln = div.cloneNode(true);
    // // cln.id = "";
    
    // div.parentNode.appendChild(cln);
    // this.fakeArray = new Array(this.desk.total_spaces);
    this.desk._id = this.desks.length; // the desk will be added as the last item on the list
    this.desk.available_spaces = this.desk.total_spaces;
    this.desk.chairs.push(...this.rent.createChairs(this.desk.total_spaces));

    $("#forr").load(" #forr > *");
    $(this).prop("disabled",true);
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
   
}
