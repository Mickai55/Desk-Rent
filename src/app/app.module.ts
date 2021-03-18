import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RentComponent } from './pages/rent/rent.component';
import { DeskRoomComponent } from './pages/desk-room/desk-room.component';
import { CreateDeskRoomComponent } from './pages/create-desk-room/create-desk-room.component';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [      
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent, 
    RentComponent,
    DeskRoomComponent,
    CreateDeskRoomComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    BrowserAnimationsModule,
    IvyCarouselModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),  
    MatTooltipModule,
    DragDropModule,
    NgbModule,
                            
  ],
  providers: [RentComponent],
  bootstrap: [AppComponent]
})


export class AppModule { }
