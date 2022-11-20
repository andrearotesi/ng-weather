import { Component } from '@angular/core';
import {LocationService} from '../location.service';
import {Observable} from 'rxjs';
import {Country} from '../countries.model';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styleUrls: ['./zipcode-entry.component.css']
})
export class ZipcodeEntryComponent {

  addLocation$: Observable<any>;
  country: Country = null;

  constructor(private service: LocationService) { }

  addLocation(zipcode: string) {
    this.addLocation$ = this.service.addLocation(zipcode, this.country);
  }

}
