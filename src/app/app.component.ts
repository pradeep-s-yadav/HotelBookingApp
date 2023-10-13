import { Component, ViewChild, ElementRef, OnInit, Inject } from '@angular/core';
import { localStorageToken } from './localstorage.token';
import { ConfigService } from './services/config.service';


@Component({
  selector: 'hotel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Hotel Application';  

  @ViewChild('name', {static: true}) name !: ElementRef;

  constructor(@Inject(localStorageToken) private localStorage: any, private configService: ConfigService){

  }

  ngOnInit(){
    this.name.nativeElement.innerText = "Kiki Hotel";
    this.localStorage.setItem('name', 'Kiki Hotel');
  }
}



