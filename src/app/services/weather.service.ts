import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'https://weather-app-api-aqgudregchgqbvej.centralus-01.azurewebsites.net/WeatherForecast';
  constructor(private http : HttpClient) {}

  getWeather() {
    debugger
    return this.http.get<any[]>(this.apiUrl + '/user');
  }

  // getWeatherforAdmin() {
  //   return this.http.get<any[]>(this.apiUrl + '/admin');
  // }
}
