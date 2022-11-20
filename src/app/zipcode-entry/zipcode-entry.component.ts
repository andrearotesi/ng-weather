import { Component } from '@angular/core';
import {LocationService} from '../location.service';
import {Observable} from 'rxjs';
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
    return this.country ?
        countries.filter(c => c.description.toLowerCase().includes(this.country?.toLowerCase()))
            .map(c => c.description)
        : [];
  }

  get currentCountry(): Country {
    return countries.find(c => c.description.toLowerCase() === this.country?.toLowerCase());
  }

  constructor(private service: LocationService) { }

  addLocation(zipcode: string) {
    this.addLocation$ = this.service.addLocation(zipcode, this.currentCountry);
    this.addLocation$.subscribe();
  }

}
