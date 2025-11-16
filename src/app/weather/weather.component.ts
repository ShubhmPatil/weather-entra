import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  template: `
    <h2>Weather Forecast</h2>
    <ul>
      <li *ngFor="let day of forecasts">{{ day.date }} – {{ day.temperatureC }}°C  {{day.summary}} {{day.audience}}</li>
    </ul>
  `
})
export class WeatherComponent {
   forecasts: any[] = [];
   forecastsOnlyForAdmin: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getWeather().subscribe(data => {
      this.forecasts = data;
    });

    // this.weatherService.getWeatherforAdmin().subscribe(data => {
    //   this.forecastsOnlyForAdmin = data;
    // });
  }
}