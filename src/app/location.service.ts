import { Injectable } from '@angular/core';
import {WeatherService} from './weather.service';
import {Country} from './countries.model';

export const ZIP_COUNTRY_MAP = 'zipCountryMap';

@Injectable()
export class LocationService {

  // Map containing the zipcode as key and the country as value
  zipCountryMap = new Map();

  constructor(private weatherService: WeatherService) {
    // fare retrieve!!
    this.zipCountryMap = new Map(JSON.parse(localStorage.getItem(ZIP_COUNTRY_MAP)));
    if (this.zipCountryMap) {
      this.zipCountryMap.forEach((country, zip) => {
        this.weatherService.addOrUpdateCurrentConditions(zip, country);
      });
    }
  }

  addLocation(zipcode: string, country: Country) {
    this.zipCountryMap.set(zipcode, country);
    localStorage.setItem(ZIP_COUNTRY_MAP, JSON.stringify([...this.zipCountryMap]));
    this.weatherService.addOrUpdateCurrentConditions(zipcode, country);
  }

  removeLocation(zipcode: string) {
    this.zipCountryMap.delete(zipcode);
    localStorage.setItem(ZIP_COUNTRY_MAP, JSON.stringify([...this.zipCountryMap]));
    this.weatherService.removeCurrentConditions(zipcode);
  }
}
