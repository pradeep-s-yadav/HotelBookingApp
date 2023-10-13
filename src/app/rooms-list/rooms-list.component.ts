import { ChangeDetectionStrategy, Component, Input, Output, OnInit, EventEmitter } 
from '@angular/core';
import { RoomsList } from '../rooms/rooms';

@Component({
  selector: 'hotel-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit {

  @Input() rooms: RoomsList[] | null = [];

  @Output() roomSelected = new EventEmitter<RoomsList>();

  ngOnInit(): void {

  }

  selectedRoom(room: RoomsList) {
    this.roomSelected.emit(room);
  }

}
