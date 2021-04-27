import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {}

  myInterval = 2000;
  activeSlideIndex = 0;

  slides = [
    {image: 'assets/images/office3.jpg'},
    {image: 'assets/images/office1.jpg'},
    {image: 'assets/images/office2.jpg'}
  ];
  
}
