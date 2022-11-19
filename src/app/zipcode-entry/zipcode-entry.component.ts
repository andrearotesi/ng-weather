import { Component } from '@angular/core';
import {LocationService} from '../location.service';
import {observable, Observable} from 'rxjs';
import {countries} from '../country-store';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styleUrls: ['./zipcode-entry.component.css']
})
export class ZipcodeEntryComponent {

  addLocation$: Observable<any>;
  country: string = null;

  get availableCountries(): string[] {
    /* Returns the countries that contain the input's value.
    if the input matches a country from the list, an empty array is returned */
    if (this.country) {
      if (countries.find(c => c.toLowerCase() === this.country.toLowerCase())) {
        return [];
      }
      return countries.filter(c => c.toLowerCase().includes(this.country.toLowerCase()));
    }
    return [];
  }

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
