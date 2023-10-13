import { Injectable, Inject } from '@angular/core';
import { RoomsList } from '../rooms';
import { APP_SERVICE_CONFIG } from 'src/app/appconfig/appconfig.service';
import { AppConfig } from 'src/app/appconfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RoomsService {

  roomList: RoomsList[] = [];

  //headers = new HttpHeaders({ 'token': 'ffgd45454' });

  getRooms$ = this.http.get<RoomsList[]>('api/rooms').pipe(
    shareReplay(1)
  );

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private http: HttpClient) {
    // console.log(environment.apiEndpoint);
    console.log(this.config.apiEndpoint);
  }

  getRooms() {
    return this.http.get<RoomsList[]>('api/rooms');
  }

  addRoom(room: RoomsList) {
    return this.http.post<RoomsList[]>('api/rooms', room);
  }

  editRoom(room: RoomsList) {
    return this.http.put<RoomsList[]>(`api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomsList[]>(`api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/photos', {
      reportProgress: true,
    });
    return this.http.request(request);
  }
}
