import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Country} from './countries.model';

@Injectable()
export class WeatherService implements OnDestroy {

  static URL = 'http://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  private currentConditions = [];
  private stopPolling = new Subject();

  constructor(private http: HttpClient) {
    /* Polling mechanism to refresh weather conditions every 30 seconds */
    timer(1, 30000).pipe(
        switchMap(() => this.refreshCurrentConditions()),
        takeUntil(this.stopPolling)
    ).subscribe();
  }

  ngOnDestroy() {
    this.stopPolling.next(true);
    this.stopPolling.complete();
  }

  addOrUpdateCurrentConditions(zipcode: string, country: Country): Observable<any> {
    /* If the weather conditions for the given zipcode have already been added,
    they are simply updated, otherwise the new conditions are added to the list */
    return new Observable((sub) => {
      this.http.get(`${WeatherService.URL}/weather?zip=${zipcode},${country.code}&units=imperial&APPID=${WeatherService.APPID}`)
          .subscribe({
            next: (data) => {
              const condition = this.getCurrentConditions().find(cond => cond.zip === zipcode);
              condition ? condition.data = data : this.currentConditions.push({zip: zipcode, country: country, data: data});
              sub.next(condition);
              sub.complete();
            },
            error: (err) => {
              sub.error(err);
            }
          });
    });
  }

  removeCurrentConditions(zipcode: string) {
    for (const i in this.currentConditions) {
      if (this.currentConditions[i].zip === zipcode) {
        this.currentConditions.splice(+i, 1);
      }
    }
  }

  getCurrentConditions(): any[] {
    return this.currentConditions;
  }

  getForecast(zipcode: string, countryCode: string): Observable<any> {
    return this.http.get(`${WeatherService.URL}/forecast/daily?zip=${zipcode},${countryCode}&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);
  }

  refreshCurrentConditions(): Observable<any> {
    /* Refresh weather data for all current conditions */
    return new Observable<any>((sub) => {
      this.getCurrentConditions().forEach(condition => {
        this.addOrUpdateCurrentConditions(condition.zip, condition.country)
            .subscribe(res => sub.next(res));
      });
      sub.complete();
    });
  }

  getWeatherIcon(id) {
    if (id >= 200 && id <= 232) {
      return WeatherService.ICON_URL + 'art_storm.png';
    } else if (id >= 501 && id <= 511) {
      return WeatherService.ICON_URL + 'art_rain.png';
    } else if (id === 500 || (id >= 520 && id <= 531)) {
      return WeatherService.ICON_URL + 'art_light_rain.png';
    } else if (id >= 600 && id <= 622) {
      return WeatherService.ICON_URL + 'art_snow.png';
    } else if (id >= 801 && id <= 804) {
      return WeatherService.ICON_URL + 'art_clouds.png';
    } else if (id === 741 || id === 761) {
      return WeatherService.ICON_URL + 'art_fog.png';
    } else {
      return WeatherService.ICON_URL + 'art_clear.png';
    }
  }

}
