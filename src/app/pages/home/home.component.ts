import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }

  myInterval = 5000;
  activeSlideIndex = 0;
  public static animation = true;

  slides = [
    {image: 'assets/ss/rent.png'},
    {image: 'assets/ss/microsoft.png'},
    {image: 'assets/ss/renting.png'},
    {image: 'assets/ss/send.png'},
    {image: 'assets/ss/acc.png'},
    {image: 'assets/ss/result.png'},
  ];

  texts = [
    'Find a Desk in your city',
    'Choose a seat',
    'Enter a specific date or a date-range for when you want to go coding',
    'Confirm the request',
    'Wait until an Admin accepts your request',
    'You are done!',
  ]
}
