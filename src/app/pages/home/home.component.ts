import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {}

  myInterval = 5000;
  activeSlideIndex = 0;

  slides = [
    {image: 'assets/ss/rent.png'},
    {image: 'assets/ss/google.png'},
    {image: 'assets/ss/renting.png'},
    {image: 'assets/ss/send.png'},
    {image: 'assets/ss/history.png'},
  ];

  texts = [
    'Find a Desk in your city',
    'Choose a seat',
    'Enter a specific date or a date-range for when you want to go coding',
    'Confirm the request',
    'Wait until an Admin accepts your request',
  ]
}
