import { Component } from '@angular/core';
import { RoomsList } from '../rooms/rooms';
import { RoomsService } from '../rooms/services/rooms.service';
import {NgForm} from '@angular/forms'

@Component({
  selector: 'hotel-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent {

  room: RoomsList = {
    roomType: '',
    amenities: '',
    checkInTime:new Date(),
    checkOutTime: new Date(),
    price: 0,
    rating: 0,
  }

  successMessage : string = '';

  constructor(private roomService: RoomsService){
    
  }

  addRoom(roomsForm: NgForm){
    this.roomService.addRoom(this.room).subscribe((data) => {
        this.successMessage='Room Added Successfully';
      roomsForm.reset();
    })
  }

}
