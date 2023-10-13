import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './validators/custom-validators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hotel-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})

export class BookingComponent implements OnInit {

  bookingForm !: FormGroup;


  constructor(private configService: ConfigService,
    private fb: FormBuilder, private router: ActivatedRoute ) {
  }

  ngOnInit(): void {
    const roomId = this.router.snapshot.paramMap.get('roomid'); 
    this.bookingForm = this.fb.group({
      roomId: new FormControl(
        {value: roomId, disabled: true},
        {validators: Validators.required}
      ),
      guestEmail: ['', [Validators.required, Validators.email]],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
      guestName: ['', [Validators.required, Validators.minLength(5), CustomValidators.validateName]],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        province: [''],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([this.addGuestControl()]),
      tnc: new FormControl(false, {validators: [Validators.requiredTrue]}),
    }, {validators: [CustomValidators.validateDate]});
  }

  bookRoom() {
    console.log(this.bookingForm.getRawValue());
    this.bookingForm.reset({
      roomId: '',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        province: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  addGuestControl(){
    return this.fb.group({ guestName: [''], age: new FormControl('') });
  }

  removeGuest(i: number){
    this.guests.removeAt(i);
  }

}