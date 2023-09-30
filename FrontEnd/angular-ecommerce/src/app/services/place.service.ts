import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../common/country';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  countriesBaseUrl: string = "http://localhost:8080/api/countries";
  statesBaseUrl: string = "http://localhost:8080/api/states";

  constructor(
    private httpClient: HttpClient
  ) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountry>(this.countriesBaseUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(countryCode: string): Observable<State[]> {
    let findByCountryCodeUrl: string = this.statesBaseUrl + `/search/findByCountryCode`
                                    + `?code=${countryCode}`;

    return this.httpClient.get<GetResponseState>(findByCountryCodeUrl).pipe(
      map(response => response._embedded.states)
    );
  }
}

interface GetResponseCountry {
  _embedded: {
    countries: Country[]
  }
}

interface GetResponseState {
  _embedded: {
    states: State[]
  }
}


