import { Component } from '@angular/core';
import {LocationService} from '../location.service';
import {observable, Observable} from 'rxjs';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styleUrls: ['./zipcode-entry.component.css']
})
export class ZipcodeEntryComponent {

  addLocation$: Observable<any>;

  constructor(private service: LocationService) { }

  addLocation(zipcode: string) {
    this.addLocation$ = new Observable<any>(sub => {
      if (zipcode) {
        this.service.addLocation(zipcode);
        sub.next();
      }
      sub.complete();
    });
  }

}
