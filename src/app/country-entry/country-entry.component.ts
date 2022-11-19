import { Component, OnInit } from '@angular/core';
import {countries} from '../country-store';

@Component({
  selector: 'app-country-entry',
  templateUrl: './country-entry.component.html',
  styleUrls: ['./country-entry.component.css']
})
export class CountryEntryComponent {

  country = null;

  get availableCountries(): string[] {
    return this.country ? countries.filter(c => c.toLowerCase().includes(this.country.toLowerCase())) : [];
  }

}
