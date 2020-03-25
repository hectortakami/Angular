import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SpotifyApiService {
  apiUrl = "https://api.spotify.com/v1";
  apiToken =
    "Bearer " +
    // Valid only 1 hour
    "BQA1PQx9Ey0LA3OxCxW94lowBxqwEEyjJu3NAEuxFKuOqbIVQS2uDU3p5i1wnj5i24nImJanyx3-VDEKrCw";
  apiHeaders = new HttpHeaders({
    Authorization: `${this.apiToken}`
  });

  constructor(private http: HttpClient) {
    console.log("Spotify service [active]");
  }

  newReleases(): Observable<any> {
    return (
      this.http
        .get(`${this.apiUrl}/browse/new-releases`, {
          headers: this.apiHeaders
        })
        // Filters the data received from API before return it
        .pipe(map(data => data["albums"]["items"]))
    );
  }

  search(searchTerm: string): Observable<any> {
    return (
      this.http
        .get(
          `${this.apiUrl}/search?q=${searchTerm}&type=track%2Cartist&market=US&limit=12&offset=5`,
          {
            headers: this.apiHeaders
          }
        )
        // Filters the data received from API before return it
        .pipe(map(data => data["artists"]["items"]))
    );
  }

  getArtist(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/artists/${id}`, {
      headers: this.apiHeaders
    });
  }

  getArtistTopTracks(id: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/artists/${id}/top-tracks?country=US`, {
        headers: this.apiHeaders
      })
      .pipe(map(data => data["tracks"]));
  }
}
