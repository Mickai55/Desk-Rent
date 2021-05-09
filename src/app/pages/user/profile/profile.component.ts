import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  users = JSON.parse(localStorage.getItem('users'));
  user = this.users[0];
  @ViewChild('img') img;

  constructor() { }
  ngOnInit(): void {
  }

  saveChanges() {
    localStorage.setItem('users', JSON.stringify(this.users))
  }

  changePhoto() {
    this.img.nativeElement.click();
  }

  onFileChange(event) {
    debugger
    if(event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => {
        this.users[0].photo = event.target.result;
        localStorage.setItem('users', JSON.stringify(this.users))
      }
    }
  }
}
