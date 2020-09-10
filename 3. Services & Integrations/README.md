# External Services

This section contains useful API services, node packages & libraries to work at with Angular 9+

## Angular Theming

###### Nebular (Eva Design System):

```console
ng add @nebular/theme
```

###### Angular Material:

```console
ng add @angular/material
```

###### Bootstrap CDN:

_index.html_

```html
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/   bootstrap/4.4.1/css/bootstrap.min.css"
  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/    Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh    "
  crossorigin="anonymous"
/>
<script
  src="https://code.jquery.com/jquery-3.4.1.    slim.min.js"
  integrity="sha384-J6qa4849blE2    +poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYf    oRSJoZ+n"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/popper.   js@1.16.0/dist/umd/popper.min.js"
  integrity="sha384-Q6E9RHvbIyZFJoft    +2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMf    ooAo"
  crossorigin="anonymous"
></script>
<script
  src="https://stackpath.bootstrapcdn.com/    bootstrap/4.4.1/js/bootstrap.min.js"
  integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnj    uUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
  crossorigin="anonymous"
></script>
```

## Auth0

https://auth0.com/

### Auth-0 SDK Setup

1. Install the SDK
   ```console
   npm install @auth0/auth0-spa-js --save
   ```
2. Generate a service to handle Auth-0 operations

   ```console
   ng generate service services/auth
   ```

3. Copy Auth-0 service implementation in the `auth.service.ts`

   ```typescript
   import { Injectable } from '@angular/core';
   import createAuth0Client from '@auth0/  auth0-spa-js';
   import Auth0Client from '@auth0/auth0-spa-js/   dist/typings/Auth0Client';
   import {
     from,
     of,
     Observable,
     BehaviorSubject,
     combineLatest,
     throwError
   } from 'rxjs';
   import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
   import { Router } from '@angular/router';

   @Injectable({
     providedIn: 'root'
   })
   export class AuthService {
     // Create an observable of Auth0 instance     of client
     auth0Client$ = (from(
       createAuth0Client({
         domain: '<APP_DOMAIN',
         client_id: '<CLIENT_ID>',
         redirect_uri: `${window.location.origin}  `
       })
     ) as Observable<Auth0Client>).pipe(
       shareReplay(1), // Every subscription   receives the same shared value
       catchError(err => throwError(err))
     );
     // Define observables for SDK methods that    return promises by default
     // For each Auth0 SDK method, first ensure    the client instance is ready
     // concatMap: Using the client instance,  call SDK method; SDK returns a promise
     // from: Convert that resulting promise   into an observable
     isAuthenticated$ = this.auth0Client$.pipe(
       concatMap((client: Auth0Client) => from(client.isAuthenticated())),
       tap(res => (this.loggedIn = res))
     );
     handleRedirectCallback$ = this.auth0Client$.pipe(
       concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
     );
     // Create subject and public observable of    user profile data
     private userProfileSubject$ = new BehaviorSubject<any>(null);
     userProfile$ = this.userProfileSubject$.asObservable();
     // Create a local property for login status
     loggedIn: boolean = null;

     constructor(private router: Router) {
       // On initial load, check authentication    state with authorization server
       // Set up local auth streams if user is     already authenticated
       this.localAuthSetup();
       // Handle redirect from Auth0 login
       this.handleAuthCallback();
     }

     // When calling, options can be passed if     desired
     // https://auth0.github.io/auth0-spa-js/  classes/auth0client.html#getuser
     getUser$(options?): Observable<any> {
       return this.auth0Client$.pipe(
         concatMap((client: Auth0Client) => from(client.getUser(options))),
         tap(user => this.userProfileSubject$.next(user))
       );
     }

     private localAuthSetup() {
       // This should only be called on app    initialization
       // Set up local authentication streams
       const checkAuth$ = this.isAuthenticated$.pipe(
         concatMap((loggedIn: boolean) => {
           if (loggedIn) {
             // If authenticated, get user and     set in app
             // NOTE: you could pass options   here if needed
             return this.getUser$();
           }
           // If not authenticated, return     stream that emits 'false'
           return of(loggedIn);
         })
       );
       checkAuth$.subscribe();
     }

     login(redirectPath: string = '/') {
       // A desired redirect path can be passed    to login method
       // (e.g., from a route guard)
       // Ensure Auth0 client instance exists
       this.auth0Client$.subscribe((client: Auth0Client) => {
         // Call method to log in
         client.loginWithRedirect({
           redirect_uri: `${window.location.origin}`,
           appState: { target: redirectPath }
         });
       });
     }

     private handleAuthCallback() {
       // Call when app reloads after user logs    in with Auth0
       const params = window.location.search;
       if (params.includes('code=') && params.includes('state=')) {
         let targetRoute: string; // Path to   redirect to after login processsed
         const authComplete$ = this.handleRedirectCallback$.pipe(
           // Have client, now call method to  handle auth callback redirect
           tap(cbRes => {
             // Get and set target redirect    route from callback results
             targetRoute =
               cbRes.appState && cbRes.appState.target
                 ? cbRes.appState.target
                 : '/';
           }),
           concatMap(() => {
             // Redirect callback complete; get    user and login status
             return combineLatest([this.getUser$(), this.isAuthenticated$]);
           })
         );
         // Subscribe to authentication    completion observable
         // Response will be an array of user  and login status
         authComplete$.subscribe(([user, loggedIn]) => {
           // Redirect to target route after   callback processing
           this.router.navigate([targetRoute]);
         });
       }
     }

     logout() {
       // Ensure Auth0 client instance exists
       this.auth0Client$.subscribe((client: Auth0Client) => {
         // Call method to log out
         client.logout({
           client_id: 'Kw3HPcG7f8Ilx4vFilGvDkliG3vOD4MF',
           returnTo: `${window.location.origin}`
         });
       });
     }
   }
   ```

4. Inject service in `app.component.ts` or the component in charge of implementing authentication

   ```typescript
   import { Component } from '@angular/core';
   import { AuthService } from './services/auth.   service';

   @Component({
     selector: 'app-root',
     templateUrl: './app.component.html',
     styleUrls: ['./app.component.scss']
   })
   export class AppComponent {
     constructor(public auth: AuthService) {}
   }
   ```

5. Configure app to listen port

   ###### Go to `Auth-0 Dashboard > Your_App > Settings`

   1. Configure `http://localhost:<APP_PORT>` in:
      - Allowed Logout URLs
      - Allowed Web Origins
   2. Save Changes

   _Note: Angular DevEnv works in port:4200 by default_

6. Store user's data (preventing browser refresh clean out)
   ###### Go to Auth-0 Dashboard > Universal Login
   1. Configure Experience as ' New '
   2. Save Changes

### Auth-0 Usage

- User's LogIn / LogOut

  ```html
  <button (click)="auth.login()" *ngIf="!auth.loggedIn">Log In</button>
  <button (click)="auth.logout()" *ngIf="auth.loggedIn">Log Out</button>
  ```

- Route Guard (CanActivate)

  ```console
  ng g g services/auth
    • CanActivate
  ```

  ###### Prevents accessing a route without log in

  _auth.guard.ts_

  ```typescript
  export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> {
      // isAuthenticated$ is a property from  Auth-0 that defines if the user is   already authenticated
      return this.auth.isAuthenticated$;
    }
  }
  ```

  _app-routing.module.ts_

  ```
  {
    path: "protected",
    component: ProtectedComponent,
    canActivate: [AuthGuard]
  }
  ```

- Retreiving user's profile data (in HTML template or as JSON in TS)


    ```html
    <pre *ngIf="auth.userProfile$ | async as    profile">
        <code>{{ profile | json }}</code>
    </pre>
    ```

    ```typescript
    export class ProtectedComponent implements  OnInit {
      profileData: any;

      constructor(public auth: AuthService) {}

      ngOnInit(): void {
        this.auth.userProfile$.subscribe(profile    => {
          this.profileData = profile;
        });
      }
    }
    ```

    _auth.userProfile$_
    ```json
    {
      "given_name": "USER_NAME",
      "family_name": "USER_LAST_NAME",
      "nickname": "NICKNAME",
      "name": "USER_NAME",
      "picture": "https://user.photo.jpg",
      "locale": "COUNTRY_CODE",
      "updated_at": "LAST_LOGIN",
      "email": "USER_EMAIL",
      "email_verified": <boolean>,
      "sub": "<social-media>-oauth2|<session-hash>"
    }
    ```

## Chart.js (ng2-charts)

https://valor-software.com/ng2-charts/

##### Installation

```console
npm install --save ng2-charts
npm install --save chart.js
```

_app.module.ts_

```typescript
import { ChartsModule } from 'ng2-charts';
// ...
imports: [
  ChartsModule
  // ...
];
```

##### Chart.js Usage

- Line Chart
  https://valor-software.com/ng2-charts/#/LineChart

- Bar Chart
  https://valor-software.com/ng2-charts/#/BarChart

- Pie Chart
  https://valor-software.com/ng2-charts/#/PieChart

- Radar Chart
  https://valor-software.com/ng2-charts/#/RadarChart

Note: Add a width & height of 100% to make the chart fit responsively the content

```html
<canvas baseChart height="100%" width="100%" ...> </canvas>
```

## Faker (Fake data generator)

https://www.npmjs.com/package/faker

```console
npm install faker --save
npm install @types/faker --save
```

_faker-usage.component.ts_

```typescript
import * as faker from 'faker';
// If the data needs to be regional (in this case names in spanish from Mexico)
// import * as faker from 'faker/locale/es_MX'
```

## MapBox ( 2D & 3D Maps, Navigation, Loaction Searching )

https://www.mapbox.com/
pk.eyJ1IjoiaGVjdGFrIiwiYSI6ImNrOTZjOWlhbjB1azUzZHB1YWQxMno5OG0ifQ.3iBKM0Lfg8kPgdMZknluAw

```console
npm install mapbox-gl --save
```

`index.html`

```html
<link
  href="https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css"
  rel="stylesheet"
/>
```

`map.component.html`

```html
<div id="YOUR_MAP_CONTAINER_ID"></div>
```

`map.component.ts`

```typescript
import * as mapboxgl from 'mapbox-gl';
// ...
setupMap(){
  setup3Dmap(container: string) {
    // INITIALIZE MAP SETTINGS
    mapboxgl.accessToken =
      'pk.eyJ1IjoiaGVjdGFrIiwiYSI6ImNrOTZjOWlhbjB1azUzZHB1YWQxMno5OG0ifQ.3iBKM0Lfg8kPgdMZknluAw';
    var map = new mapboxgl.Map({

      style: 'mapbox://styles/mapbox/light-v10',

      // IMPORTANT! center:[LONGITUDE, LATITUDE]
      center: [this.longitude, this.latitude],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: YOUR_MAP_CONTAINER_ID,
      antialias: true
    });

    // CREATE 3D BUILDING REFERENCES
    map.on('load', function() {
      map.resize();

      var layers = map.getStyle().layers;
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      map.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });

    // CREATE MAP MARKER
    var marker = new mapboxgl.Marker({
      draggable: false
    })
      .setLngLat([this.longitude, this.latitude])
      .addTo(map);
  }
}
```

## Google Maps (AGM)

Angular Maps Module (AGM) Docs: https://angular-maps.com/
Create Google Maps [API KEY]: https://console.cloud.google.com/google/maps-apis/start

```console
npm install @agm/core --save
```

_app.module.ts_

```typescript
import { AgmCoreModule } from '@agm/core';
// ...
imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'GOOGLE_MAPS_API_KEY'
    })
  ],
```

###### AGM Usage

- Create Map
  _google-map.component.html_

  ```html
  <agm-map
    (mapClick)="clickOnMap($event)"
    [latitude]="<MAP_LATITUDE>"
    [longitude]="<MAP_LONGITUDE>"
  >
    <!-- ALL MARKERS GOES HERE -->
  </agm-map>
  ```

  _google-map.component.ts_

  ```typescript
  mapMarkers: MapMarker[] = [];
  latitude = 40.73061;
  longitude = -73.935242;

   onClickMap(event: Event){
    // event returns an object coords with the clicked latitude and longitude
    // coords = { lat: <number>, lng: <number>}
  }
  ```

- Map Marker

  The best practice is create a model to manage the map market properties
  _map-market.ts_

  ```typescript
  export class MapMarker {
    constructor(
      public latitude: number,
      public longitude: number // More MapMarker properties if needed
    ) {}
  }
  ```

  _google-map.component.html_

  ```html
    <agm-marker
    [latitude]="<MARKER_LATITUDE>"
    [longitude]="<MARKER_LONGITUDE>"
    >
      <!-- INFO WINDOW GOES HERE -->
    </agm-map>
  ```

- Marker Info Window (Dialog when marker is clicked)

  _google-map.component.html_

  ```html
  <agm-info-window>
    <!-- Window design goes here -->
  </agm-info-window>
  ```

## Youtube API

https://developers.google.com/youtube/v3/

##### DOM Video Sanitizer (Youtube embed videos) | Pipe Sanitizer

```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string): SafeResourceUrl {
    let url = 'https://www.youtube.com/embed/';

    return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value);
  }
}
```

## The Movies Database (TMDb) API

_tmdb.service.ts_

```typescript
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// ...
export class TmdbService {
  tmdbUrl = 'https://api.themoviedb.org/3';
  imgUrl = 'https://image.tmdb.org/t/p/w500';
  apiKey = '3562a77d8968c9e30b3d1410e3812018';

  constructor(private http: HttpClient) {}

  // All methods goes here
}
```

1. Discover Top Rated Movies

   ```typescript
   getPopularMovies() {
   return this.http
     .get(
       `${this.tmdbUrl}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc`
     )
     .pipe(
       map((response: any[]) => {
         response["results"].forEach(movie => {
           movie["poster_path"] = `${this.imgUrl}${movie["poster_path"]}`;
         });
         return response["results"];
       })
     );
   }
   ```

2. Get Movie

   ```typescript
   getMovie(movieID: string) {
    return this.http
      .get(
        `${this.tmdbUrl}/movie/${movieID}?api_key=${this.apiKey}&language=en-US`
      )
      .pipe(
        map(movie => {
          movie["poster_path"] = `${this.imgUrl}${movie["poster_path"]}`;
          return movie;
        })
      );
   }
   ```

3. Search movies
   ```typescript
   searchMovie(movieTitle: string) {
    movieTitle.replace(/\s/g, "%20");
    https: return this.http
      .get(
        `${this.tmdbUrl}/search/movie/?api_key=${this.apiKey}&language=en-US&query=${movieTitle}`
      )
      .pipe(
        map((response: any[]) => {
          response["results"].forEach(movie => {
            if (movie["poster_path"]) {
              movie["poster_path"] = `${this.imgUrl}${movie["poster_path"]}`;
            }
          });
          return response["results"];
        })
      );
   }
   ```

## News API

https://newsapi.org/

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ResultTopHeadlines, Article } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  apiKey = environment.apiKey;
  url = 'http://newsapi.org/v2';
  pageNum = 0;
  categories = {
    general: 0,
    business: 0,
    health: 0,
    entertainment: 0,
    science: 0,
    sports: 0,
    technology: 0
  };
  actualCategory = 'general';

  constructor(private http: HttpClient) {}

  getTopHeadlines() {
    this.pageNum++;
    return this.http
      .get(
        `${this.url}/top-headlines?country=us&page=${this.pageNum}&apiKey=${this.apiKey}`
      )
      .pipe(
        map((response: ResultTopHeadlines): Article[] => {
          return response.articles;
        })
      );
  }

  getNewsByCategory(category: string) {
    if (this.actualCategory != category) {
      this.categories[this.actualCategory] = 0;
      this.actualCategory = category;
    }
    const categoryPage = this.categories[this.actualCategory]++;
    return this.http
      .get(
        `${this.url}/top-headlines?country=us&category=${category}&page=${categoryPage}&apiKey=${this.apiKey}`
      )
      .pipe(
        map((response: ResultTopHeadlines): Article[] => {
          return response.articles;
        })
      );
  }
}
```

## Spotify API

### Usage

1. ###### Create a Spotify Application

   https://developer.spotify.com/dashboard/

2. ###### Generate Token (Postman)

   https://developer.spotify.com/documentation/general/guides/authorization-guide/

Postman Request

```
Request: POST
URL: https://accounts.spotify.com/api/token
Body: application/x-www-form-urlencoded

KEY               Value
grant_type        client_credentials
client_id         <SPOTIFY_CLIENT_ID>
client_secret     <SPOTIFY_CLIENT_SECRET>
```

Postman Response

```
{
   "access_token":"<SPOTIFY_ACCESS_TOKEN>",
   "token_type":"Bearer",
   "expires_in":3600,
   "scope":""
}
```

_Note: This token is only valid 1 hour_

### API Requests

- Get a List of New Releases

  ```
   Request: GET
   URL: https://api.spotify.com/v1/browse/new-releases?limit=<no.registers>

   Headers
   KEY               Value
   Authorization     Bearer <SPOTIFY_ACCESS_TOKEN>
  ```

- Search in Spotify

  ```
   Request: GET
   URL: https://api.spotify.com/v1/search?q=$<search_term>&type=track%2Cartist&market=US&limit=12&offset=5`

   Headers
   KEY               Value
   Authorization     Bearer <SPOTIFY_ACCESS_TOKEN>
  ```

- Get an Artist

  ```
   Request: GET
   URL: https://api.spotify.com/v1/artists/<artist_id>`

   Headers
   KEY               Value
   Authorization     Bearer <SPOTIFY_ACCESS_TOKEN>
  ```

- Get Artist Top Tracks

  ```
   Request: GET
   URL: https://api.spotify.com/v1/artists/<artist_id>/top-tracks?country=<country_code>`

   Headers
   KEY               Value
   Authorization     Bearer <SPOTIFY_ACCESS_TOKEN>
  ```
