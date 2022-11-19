import { Injectable } from '@angular/core';
import {WeatherService} from './weather.service';
import {Country} from './countries.model';
import {Observable} from 'rxjs';

export const ZIP_COUNTRY_MAP = 'zipCountryMap';

@Injectable()
export class LocationService {

  // Map containing the zipcode as key and the country as value
  zipCountryMap = new Map();

  constructor(private weatherService: WeatherService) {
    this.zipCountryMap = new Map(JSON.parse(localStorage.getItem(ZIP_COUNTRY_MAP)));
    if (this.zipCountryMap) {
      this.zipCountryMap.forEach((country, zip) => {
        this.weatherService.addOrUpdateCurrentConditions(zip, country).subscribe();
      });
    }
  }

  addLocation(zipcode: string, country: Country) {
    return new Observable((sub) => {
      this.zipCountryMap.set(zipcode, country);
      localStorage.setItem(ZIP_COUNTRY_MAP, JSON.stringify([...this.zipCountryMap]));
      this.weatherService.addOrUpdateCurrentConditions(zipcode, country)
          .subscribe({
            next: (res) => sub.next(res),
            complete: () => sub.complete(),
            error: (err) => sub.error(err),
          });
    });
  }

  removeLocation(zipcode: string) {
    this.zipCountryMap.delete(zipcode);
    localStorage.setItem(ZIP_COUNTRY_MAP, JSON.stringify([...this.zipCountryMap]));
    this.weatherService.removeCurrentConditions(zipcode);
  }
}
