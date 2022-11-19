import { Component } from '@angular/core';
import {LocationService} from '../location.service';
import {observable, Observable} from 'rxjs';
import {countries, Country} from '../countries.model';

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
      if (this.currentCountry) {
        return [];
      }
      return countries.filter(c => c.description.toLowerCase().includes(this.country.toLowerCase()))
          .map(c => c.description);
    }
    return [];
  }

  get currentCountry(): Country {
    return countries.find(c => c.description.toLowerCase() === this.country.toLowerCase())
  }

  constructor(private service: LocationService) { }

  addLocation(zipcode: string) {
    this.addLocation$ = this.service.addLocation(zipcode, this.currentCountry);
    this.addLocation$.subscribe();
  }

}
