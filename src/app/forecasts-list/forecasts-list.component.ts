import { Component } from '@angular/core';
import {WeatherService} from '../weather.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {

  zipcode: string;
  country: string;
  forecast: any;

  constructor(private weatherService: WeatherService, route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
      this.country = params['country'];
      weatherService.getForecast(this.zipcode, this.country)
        .subscribe(data => this.forecast = data);
    });
  }
}
