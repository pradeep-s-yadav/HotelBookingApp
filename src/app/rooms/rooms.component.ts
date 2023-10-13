import { HeaderComponent } from '../header/header.component';
import { Room, RoomsList } from './rooms';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { EventType } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hotel-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})

export class RoomsComponent implements OnInit, AfterViewInit {

  hotelName = 'Kiki Hotel';
  numberOfRooms = 100;
  roomsHidden = true;

  priceFilter = new FormControl(0);

  rooms: Room = {
    totalRooms: 100,
    occupiedRooms: 80,
    availableRooms: 10
  }

  totalBytes = 0;

  subscrition !: Subscription;

  error$ = new Subject<string>;
  getError$ = this.error$.asObservable();

  rooms$ = this.roomService.getRooms$.pipe(
    catchError((err) => {
      //console.log(err)
      this.error$.next(err.message);
      return of([])
    }
    ));


  roomCount$ = this.roomService.getRooms$.pipe(
    map((rooms) => rooms.length)
  );

  constructor(private roomService: RoomsService, private configService: ConfigService) {

  }

  ngAfterViewInit() {
    this.headerComponent.title = 'Hotel View';
  }

  ngOnInit(): void {

    //console.log(this.headerComponent);

    //   this.stream.subscribe( {
    //     next: (value) => console.log(value),
    //     complete: () => console.log('complete'),
    // });
    //   this.stream.subscribe(data => console.log(data));

    this.roomService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request made.');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request Succeeded.');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    }
    );

    // this.subscrition = this.roomService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // });

  }

  roomSelected!: RoomsList;

  roomList: RoomsList[] = [];

  // stream = new Observable(observer => {
  //   observer.next('user1');
  //   observer.next('user2');
  //   observer.next('user3');
  //   observer.complete();
  // })

  @ViewChild(HeaderComponent) headerComponent !: HeaderComponent;


  toggle() {
    this.roomsHidden = !this.roomsHidden;
  }

  selectRoom(room: RoomsList) {
    this.roomSelected = room;
  }

  addRoom() {
    const room: RoomsList = {
      roomNumber: '7',
      roomType: 'Deluxe Room',
      amenities: 'Free Wifi, Television, Bathroom',
      price: 800,
      checkInTime: new Date('09-Dec-2023'),
      checkOutTime: new Date('12-Dec-2023'),
      rating: 4.0
    };
    //this.roomList.push(room);
    // this.roomList = [...this.roomList, room];

    this.roomService.addRoom(room).subscribe((data) => this.roomList = data);
  }

  editRoom() {
    const room: RoomsList = {
      roomNumber: '1',
      roomType: 'Deluxe Room',
      amenities: 'Free Wifi, Television, Bathroom',
      price: 800,
      checkInTime: new Date('09-Dec-2023'),
      checkOutTime: new Date('12-Dec-2023'),
      rating: 4.0
    };

    this.roomService.editRoom(room).subscribe((data) => this.roomList = data);
  }

  deleteRoom() {
    this.roomService.deleteRoom('3').subscribe((data) => this.roomList = data);
  }

}




