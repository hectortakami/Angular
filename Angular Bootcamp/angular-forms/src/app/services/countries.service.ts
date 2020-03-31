import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountries() {
    // Return Spanish Speaking Conuntries { country name & country code (3 letters)}
    return this.http.get("https://restcountries.eu/rest/v2/lang/es").pipe(
      map((response: any[]) => {
        // console.log(response) to see the full contries array with all their properties
        return response.map(countryResponse => {
          return {
            country: countryResponse.name,
            code: countryResponse.alpha3Code
          };
        });
      })
    );
  }
}
