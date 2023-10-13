import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'hotel-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  id: number = 0;

  //paramMap is preferred compared to params and snapshot as it can have multiple values and can 
  //show the updated values as well which snapshot cannot do.

  // id$ = this.router.params.pipe(
  //   map(params => params['roomid'])
  // );

  id$ = this.router.paramMap.pipe(
    map(params => params.get('roomid'))
  );

  constructor(private router: ActivatedRoute) {

  }

  ngOnInit(): void {

  }

}
