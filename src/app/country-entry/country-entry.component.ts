import {Component, EventEmitter, Output} from '@angular/core';
import {countries, Country} from '../countries.model';

@Component({
  selector: 'app-country-entry',
  templateUrl: './country-entry.component.html',
  styleUrls: ['./country-entry.component.css']
})
export class CountryEntryComponent {

  @Output() onCountrySelection = new EventEmitter<Country>();

  country: string = null;

  get availableCountries(): Country[] {
    // Returns all countries whose description contains the input's value
    return this.country ?
        countries.filter(c => c.description.toLowerCase().includes(this.country?.toLowerCase()))
        : [];
  }

  get matchingCountry() {
    // Returns the country that matches the input's value
    return this.country ?
        countries.find(c => c.description.toLowerCase() === this.country.toLowerCase())
        : null;
  }

  onCountryChange() {
    /* If the input's value matches a country, it gets emitted.
    this logic is created to the support manual insertion of a country. */
    if (this.matchingCountry) {
      this.selectCountry(this.matchingCountry);
    }
  }

  selectCountry(country: Country) {
    this.country = country.description;
    this.onCountrySelection.emit(country);
  }

  trackByCode(index, item: Country) {
    return item.code;
  }
}
